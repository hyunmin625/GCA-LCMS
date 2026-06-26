import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import type { Course } from '@/lib/types'
import Nav from '@/components/Nav'
import PaymentButton from './PaymentButton'
import styles from './payment.module.css'

export default async function PaymentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createServerClient()

  // 로그인 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?redirect=/payment/${slug}`)

  // 코스 정보
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single() as { data: Course | null }

  if (!course) notFound()

  // 무료 코스이면 강의실로
  if (course.is_free) redirect(`/classroom/${slug}`)

  // 이미 수강 중이면 강의실로
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .maybeSingle()

  if (enrollment) redirect(`/classroom/${slug}`)

  const formattedPrice = new Intl.NumberFormat('ko-KR').format(course.price)

  return (
    <div className={styles.page}>
      <Nav links={[{ href: `/courses/${slug}`, label: '← 코스 소개' }]} />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.badge}>// CHECKOUT</div>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.desc}>{course.description}</p>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>수강료</span>
            <span className={styles.price}>₩{formattedPrice}</span>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✓</span>
              <span>평생 소장 — 한 번 결제 후 무제한 수강</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✓</span>
              <span>강의 자료 및 실습 파일 제공</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✓</span>
              <span>수료증 자동 발급 (5단계 예정)</span>
            </div>
          </div>

          <div className={styles.divider} />

          <PaymentButton
            courseId={course.id}
            courseSlug={course.slug}
            courseTitle={course.title}
            amount={course.price}
            userId={user.id}
          />

          <p className={styles.notice}>
            결제 문의: <a href="mailto:support@codenova.kr">support@codenova.kr</a>
          </p>
        </div>
      </div>
    </div>
  )
}
