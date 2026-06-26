import Link from 'next/link'
import Nav from '@/components/Nav'
import styles from './page.module.css'

const features = [
  { icon: '▶', color: 'green', title: '기초 과정 완전 무료', desc: 'Python 기초 25개 강의를 무료로 제공합니다. 부담 없이 프로그래밍 첫걸음을 시작하세요.' },
  { icon: '◈', color: 'cyan', title: '기초 → 마스터 로드맵', desc: '기초 과정으로 탄탄한 토대를 쌓고, 마스터 과정에서 실전 개발자로 성장하세요.' },
  { icon: '◉', color: 'amber', title: '진행률 추적', desc: '완료한 강의를 체크하고 시각적 그래프로 학습 진행 상황을 한눈에 확인하세요.' },
  { icon: '⟐', color: 'pink', title: '6개 실전 프로젝트', desc: '웹 스크래핑, API 서버, 데이터 분석, 챗봇까지. 프로젝트를 만들며 포트폴리오를 완성합니다.' },
  { icon: '⬡', color: 'purple', title: '한국어 맞춤 설명', desc: '영어 문서의 장벽 없이, 한국어로 된 명쾌한 설명과 예제로 학습 효율을 높입니다.' },
  { icon: '⟁', color: 'green', title: '자기 주도 학습', desc: '언제 어디서든 원하는 속도로 학습하세요. 반복 시청과 북마크로 나만의 학습법을 만듭니다.' },
]

const basicsSections = [
  { num: '01', title: '시작하기 — Python 설치와 첫 코드', desc: 'Python 소개, 개발 환경 설정, Hello World, 실행 방식 이해', meta: '4개 강의 · 약 40분' },
  { num: '02', title: '데이터 다루기 — 변수, 문자열, 연산자', desc: '변수, 숫자형, 문자열, 불리언, input(), 타입 변환 + 계산기 실습', meta: '7개 강의 · 약 1.5시간' },
  { num: '03', title: '흐름 제어 — 조건문과 반복문', desc: 'if문, for문, while문, 리스트/딕셔너리 기초, 중첩 반복 + 게임 실습', meta: '7개 강의 · 약 1.7시간' },
  { num: '04', title: '함수와 모듈 — 코드 재사용', desc: '함수 정의, 에러 처리, 파일 입출력, 모듈/pip + To-Do 리스트 실습', meta: '7개 강의 · 약 1.6시간' },
]

const masterSections = [
  { num: '01', title: '자료구조 완전 정복', desc: '리스트 심화, 튜플, 딕셔너리 심화, 집합, 스택/큐/덱 + 단어 빈도 분석기', meta: '6개 강의 · 약 1.7시간' },
  { num: '02', title: '객체지향 프로그래밍 (OOP)', desc: '클래스, 상속, 캡슐화, 다형성, 매직 메서드 + 은행 계좌 시스템', meta: '6개 강의 · 약 2시간' },
  { num: '03', title: '알고리즘과 문제 해결', desc: 'Big-O, 재귀, 정렬(버블~퀵), 탐색(이진/DFS/BFS), DP + 코딩 테스트', meta: '7개 강의 · 약 2.5시간' },
  { num: '04', title: '웹 개발 입문 — Flask & API', desc: 'Flask 시작, 라우팅, REST API, SQLite 연동 + 북마크 API 서버', meta: '5개 강의 · 약 1.8시간' },
  { num: '05', title: '데이터 분석 — pandas & 시각화', desc: 'DataFrame, 데이터 정제, groupby, matplotlib + 공공데이터 분석', meta: '5개 강의 · 약 1.9시간' },
  { num: '06', title: '실전 프로젝트 & 포트폴리오', desc: '웹 스크래핑, 업무 자동화, 텔레그램 챗봇, Git/GitHub + 최종 프로젝트', meta: '7개 강의 · 약 3.1시간' },
]

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* NAV */}
      <Nav links={[
        { href: '/courses', label: '코스' },
        { href: '#features', label: '기능' },
        { href: '#curriculum', label: '커리큘럼' },
      ]} />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGridBg} />
        <div className={`${styles.heroGlow} ${styles.heroGlow1}`} />
        <div className={`${styles.heroGlow} ${styles.heroGlow2}`} />
        <div className={styles.heroContent}>
          <div>
            <div className={styles.heroBadge}>● 2026 신규 커리큘럼 오픈</div>
            <h1 className={styles.heroTitle}>
              코드 한 줄이<br /><span className={styles.highlight}>미래를 바꿉니다</span>
            </h1>
            <p className={styles.heroDesc}>
              무료 기초 과정으로 Python을 시작하고,<br />
              마스터 과정에서 웹 개발, 데이터 분석, 자동화까지 정복하세요.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth/signup" className={`${styles.btn} ${styles.btnPrimary}`}>무료로 시작하기 →</Link>
              <Link href="#curriculum" className={`${styles.btn} ${styles.btnOutline}`}>커리큘럼 보기</Link>
            </div>
          </div>

          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={styles.dot} style={{background:'#ff5f57'}} />
              <span className={styles.dot} style={{background:'#febc2e'}} />
              <span className={styles.dot} style={{background:'#28c840'}} />
              <span className={styles.terminalTitle}>python3 — codenova</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.termComment}># 첫 번째 프로그램</div>
              <div><span className={styles.termKeyword}>def</span><span className={styles.termFunc}> hello_world</span><span className={styles.termText}>():</span></div>
              <div><span className={styles.termText}>{'    '}</span><span className={styles.termKeyword}>return</span><span className={styles.termString}> "안녕, 세상아! 🚀"</span></div>
              <br />
              <div><span className={styles.termPrompt}>&gt;&gt;&gt; </span><span className={styles.termFunc}>print</span><span className={styles.termText}>(hello_world())</span></div>
              <div className={styles.termOutput}>안녕, 세상아! 🚀</div>
              <br />
              <div><span className={styles.termPrompt}>&gt;&gt;&gt; </span><span className={styles.termText}>career</span><span className={styles.termKeyword}> = </span><span className={styles.termString}>"developer"</span></div>
              <div><span className={styles.termPrompt}>&gt;&gt;&gt; </span><span className={styles.termFunc}>print</span><span className={styles.termText}>(</span><span className={styles.termString}>f"목표: </span><span className={styles.termText}>{'{'}</span><span className={styles.termText}>career</span><span className={styles.termText}>{'}'}</span><span className={styles.termString}>"</span><span className={styles.termText}>)</span></div>
              <div className={styles.termOutput}>목표: developer<span className={styles.cursor} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsBar}>
        <div className={styles.statsGrid}>
          {[['61+','강의 영상'],['2','코스 (무료+유료)'],['25','무료 강의'],['20시간+','총 학습 시간']].map(([n,l]) => (
            <div key={l} className={styles.statItem}>
              <h3>{n}</h3><p>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.section} id="features">
        <div className={styles.sectionLabel}>// FEATURES</div>
        <h2 className={styles.sectionTitle}>왜 CodeNova인가?</h2>
        <p className={styles.sectionDesc}>무료 기초부터 실전 프로젝트까지, CodeNova만의 차별점을 확인하세요.</p>
        <div className={styles.featuresGrid}>
          {features.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles[f.color]}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM */}
      <section className={styles.curriculumSection} id="curriculum">
        <div className={styles.section}>
          <div className={styles.sectionLabel}>// CURRICULUM</div>
          <h2 className={styles.sectionTitle}>학습 로드맵</h2>
          <p className={styles.sectionDesc}>기초는 무료로, 마스터는 실전으로. 두 과정으로 완성되는 Python 여정.</p>

          {/* Python 기초 */}
          <div className={styles.courseBlock}>
            <div className={styles.courseBlockHeader}>
              <div>
                <div className={styles.courseBlockBadge}>
                  <span className={styles.badgeFree}>FREE</span>
                </div>
                <h3 className={styles.courseBlockTitle}>Python 기초 — 프로그래밍 첫걸음</h3>
                <p className={styles.courseBlockMeta}>25개 강의 · 약 6시간 · 입문자 대상</p>
                <p className={styles.courseBlockDesc}>프로그래밍이 처음이어도 괜찮습니다. 변수부터 함수까지, Python의 핵심을 쉽고 재미있게 배워보세요.</p>
              </div>
              <Link href="/courses/python-basics" className={`${styles.btn} ${styles.btnPrimary}`}>무료로 시작하기 →</Link>
            </div>
            <div className={styles.courseBlockGrid}>
              {basicsSections.map(item => (
                <div key={item.num} className={styles.curriculumItem}>
                  <span className={styles.curriculumNum}>{item.num}</span>
                  <div className={styles.curriculumInfo}>
                    <h4>{item.title}</h4>
                    <p className={styles.curriculumDesc}>{item.desc}</p>
                    <p className={styles.curriculumMeta}>{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 화살표 구분선 */}
          <div className={styles.courseArrow}>
            <div className={styles.courseArrowLine} />
            <span className={styles.courseArrowText}>기초 완료 후 마스터로</span>
            <div className={styles.courseArrowLine} />
          </div>

          {/* Python 마스터 */}
          <div className={`${styles.courseBlock} ${styles.courseBlockMaster}`}>
            <div className={styles.courseBlockHeader}>
              <div>
                <div className={styles.courseBlockBadge}>
                  <span className={styles.badgePro}>PRO</span>
                  <span className={styles.badgePrice}>₩59,000</span>
                </div>
                <h3 className={styles.courseBlockTitle}>Python 마스터 — 실전 개발자로 가는 길</h3>
                <p className={styles.courseBlockMeta}>36개 강의 · 약 14시간 · 6개 실전 프로젝트 포함</p>
                <p className={styles.courseBlockDesc}>OOP, 알고리즘, 웹 개발, 데이터 분석, 자동화까지. 실무에서 바로 쓸 수 있는 Python 실력을 완성합니다.</p>
              </div>
              <Link href="/courses/python-master" className={`${styles.btn} ${styles.btnMaster}`}>마스터 과정 보기 →</Link>
            </div>
            <div className={styles.courseBlockGrid}>
              {masterSections.map(item => (
                <div key={item.num} className={`${styles.curriculumItem} ${styles.masterItem}`}>
                  <span className={`${styles.curriculumNum} ${styles.masterNum}`}>{item.num}</span>
                  <div className={styles.curriculumInfo}>
                    <h4>{item.title}</h4>
                    <p className={styles.curriculumDesc}>{item.desc}</p>
                    <p className={styles.curriculumMeta}>{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.heroGlow} style={{top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'var(--accent-green)',opacity:'0.05',width:'800px',height:'400px',borderRadius:'50%',position:'absolute',filter:'blur(120px)',pointerEvents:'none'}} />
        <div className={styles.ctaContent}>
          <h2>지금 바로<br />코딩을 시작하세요</h2>
          <p>25개 무료 강의로 Python 기초를 완성하세요. 결제 없이 바로 시작합니다.</p>
          <Link href="/auth/signup" className={`${styles.btn} ${styles.btnPrimary}`}>무료 회원가입 →</Link>
          <div className={styles.ctaCode}><span>$</span> python3 -c &quot;import codenova; codenova.<span>start</span>()&quot;</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 CodeNova — Built for learners, by developers.</p>
      </footer>
    </div>
  )
}
