'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import styles from './Nav.module.css'

type NavProps = {
  links?: { href: string; label: string }[]
}

export default function Nav({ links = [] }: NavProps) {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [displayName, setDisplayName] = useState<string>('')
  const [role, setRole] = useState<string>('student')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ignore = false

    const loadProfile = (userId: string) => {
      supabase
        .from('profiles')
        .select('display_name, role')
        .eq('id', userId)
        .single()
        .then(({ data: profile }) => {
          if (!ignore && profile) {
            setDisplayName(profile.display_name ?? '')
            setRole(profile.role ?? 'student')
          }
        })
    }

    // Initial auth check
    supabase.auth.getUser().then(({ data, error }) => {
      if (ignore) return
      if (error || !data.user) {
        // Invalid/expired session — clean up silently
        supabase.auth.signOut()
        setUser(null)
        setDisplayName('')
        setRole('student')
        return
      }
      setUser(data.user)
      loadProfile(data.user.id)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (ignore) return
      if (event === 'TOKEN_REFRESHED' && !session) {
        // Refresh failed — sign out cleanly
        supabase.auth.signOut()
        setUser(null)
        setDisplayName('')
        setRole('student')
        return
      }
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setDisplayName('')
        setRole('student')
      }
    })

    return () => { ignore = true; subscription.unsubscribe() }
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMenuOpen(false)
    router.push('/')
  }

  const initial = displayName?.[0] ?? user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>CodeNova<span>_</span></Link>
      <div className={styles.right}>
        {links.map(link => (
          <Link key={link.href} href={link.href} className={styles.link}>{link.label}</Link>
        ))}

        {user ? (
          <div className={styles.profileWrap} ref={menuRef}>
            <button className={styles.profileBtn} onClick={() => setMenuOpen(v => !v)}>
              <span className={styles.avatar}>{initial}</span>
            </button>
            {menuOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownName}>{displayName || '사용자'}</span>
                  <span className={styles.dropdownEmail}>{user.email}</span>
                </div>
                <div className={styles.dropdownDivider} />
                <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>마이페이지</Link>
                <Link href="/courses" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>코스 목록</Link>
                {role === 'admin' && (
                  <>
                    <div className={styles.dropdownDivider} />
                    <Link href="/admin" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>관리자</Link>
                  </>
                )}
                <div className={styles.dropdownDivider} />
                <button className={styles.dropdownItem} onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/login" className={styles.loginBtn}>로그인</Link>
        )}
      </div>
    </nav>
  )
}
