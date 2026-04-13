export const SITE_NAME = "위례 시민공원";
export const SITE_DESCRIPTION =
  "93만㎡ 성남골프클럽 부지를 12만 위례 시민의 공원으로. 서명으로 함께해주세요.";
export const SITE_URL = "https://wiryevote.kr";

export const ELECTION_DATE = new Date("2026-06-03");

export const SGC_AREA_SQM = 931_128;
export const SGC_AREA_PYEONG = 282_160;
export const WIRYE_POPULATION = 126_168;
export const WIRYE_HOUSEHOLDS = 42_910;

export const GOLF_PROJECT_COST = 8_700; // 억 원 (토지 매입비 + 개발비 합산 추정, 하남도시공사)
export const PARK_ESTIMATED_COST = 980; // 억 원 (국토부 2025 표준조성비 ㎡당 10.5만 원 기준)
export const PARK_COST_PER_SQM = 10.5; // 만 원/㎡ (2025 국토부 표준조성비)
export const GOLF_AVG_ANNUAL_PROFIT = 66; // 억 원 (2024 대중형 평균)
export const GOLF_PAYBACK_YEARS = Math.ceil(GOLF_PROJECT_COST / GOLF_AVG_ANNUAL_PROFIT); // ~132년
