-- CodeNova Payments Schema (4단계)
-- Supabase SQL Editor에서 실행하세요

-- 1. 결제 테이블
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  course_id uuid references courses on delete cascade not null,
  amount integer not null,
  status text default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  payment_key text,               -- 토스페이먼츠 paymentKey
  order_id text unique,           -- 주문 고유 ID (토스 연동 시 사용)
  paid_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz default now()
);

-- RLS 활성화
alter table payments enable row level security;

-- 본인 결제 내역 읽기
create policy "본인 결제 읽기" on payments
  for select using (auth.uid() = user_id);

-- 본인 결제 생성
create policy "본인 결제 생성" on payments
  for insert with check (auth.uid() = user_id);

-- 관리자 전체 결제 조회
create policy "관리자 결제 조회" on payments
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 관리자 결제 상태 수정 (환불 처리 등)
create policy "관리자 결제 수정" on payments
  for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 2. 유료 코스 수강 등록은 결제 완료 후에만 가능하도록
--    (현재는 서버사이드 API Route에서 검증 예정 — 토스 웹훅 연동 시)

-- 참고: 결제 완료(status = 'paid') 시 enrollments에 자동 등록하는 함수
--       (토스 웹훅 API Route에서 직접 처리 예정이므로 DB 트리거는 미사용)
