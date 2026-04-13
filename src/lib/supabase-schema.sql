-- 위례 시민공원 캠페인 Supabase 스키마
-- Supabase 대시보드 > SQL Editor에서 실행

-- 1. 서명 테이블
create table if not exists signatures (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  district    text not null check (district in ('하남시', '성남시', '송파구')),
  apartment   text not null,
  dong        text not null,
  comment     text,
  source      text,
  agreed_privacy boolean not null default false,
  created_at  timestamptz default now()
);

-- 2. 아파트 목록 테이블
create table if not exists apartments (
  id         serial primary key,
  district   text not null check (district in ('하남시', '성남시', '송파구')),
  name       text not null,
  sort_order int default 0
);

-- 3. 후보 입장 테이블
create table if not exists candidate_positions (
  id          serial primary key,
  name        text not null,
  party       text not null,
  position    text not null,
  stance      text check (stance in ('공원', '골프장', '미발표', '기타')),
  detail      text,
  photo_url   text,
  updated_at  timestamptz default now()
);

-- 4. RLS 정책
alter table signatures enable row level security;
alter table apartments enable row level security;
alter table candidate_positions enable row level security;

-- 서명: 누구나 INSERT 가능, SELECT는 명시적 차단 (집계 뷰로만 조회)
create policy "Anyone can insert signature"
  on signatures for insert
  to anon
  with check (agreed_privacy = true);

create policy "No direct select on signatures"
  on signatures for select
  to anon
  using (false);

-- 아파트 목록: 누구나 READ 가능
create policy "Anyone can read apartments"
  on apartments for select
  to anon
  using (true);

-- 후보 입장: 누구나 READ 가능
create policy "Anyone can read candidates"
  on candidate_positions for select
  to anon
  using (true);

-- 5. 서명 집계 뷰 (개인정보 비노출)
create or replace view signature_stats as
select
  count(*) as total_count,
  count(*) filter (where district = '하남시') as hanam_count,
  count(*) filter (where district = '성남시') as seongnam_count,
  count(*) filter (where district = '송파구') as songpa_count
from signatures;

-- 지역별 아파트 서명 수 뷰
create or replace view apartment_stats as
select
  district,
  apartment,
  count(*) as count
from signatures
group by district, apartment
order by count desc;

-- 최근 한마디 뷰 (이름 마스킹)
create or replace view recent_comments as
select
  left(name, 1) || '**' as masked_name,
  district,
  comment,
  created_at
from signatures
where comment is not null and comment != ''
order by created_at desc
limit 20;

-- 뷰에 대한 RLS (anon 접근 허용)
grant select on signature_stats to anon;
grant select on apartment_stats to anon;
grant select on recent_comments to anon;
