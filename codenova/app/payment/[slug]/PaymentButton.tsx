'use client'

import { useState } from 'react'
import styles from './payment.module.css'

export default function PaymentButton({
  courseId,
  courseSlug,
  courseTitle,
  amount,
  userId,
}: {
  courseId: string
  courseSlug: string
  courseTitle: string
  amount: number
  userId: string
}) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    // TODO: 토스페이먼츠 연동 시 구현
    // const orderId = `order_${Date.now()}_${userId.slice(0, 8)}`
    // await tossPayments.requestPayment('카드', { orderId, orderName: courseTitle, amount, ... })
    alert('토스페이먼츠 연동 준비 중입니다.\n가입 완료 후 연동할 예정입니다.')
    setLoading(false)
  }

  return (
    <button
      className={styles.payBtn}
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? '처리 중...' : `₩${new Intl.NumberFormat('ko-KR').format(amount)} 결제하기`}
    </button>
  )
}
