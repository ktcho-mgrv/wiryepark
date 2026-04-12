import { z } from "zod";

export const signatureSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해주세요")
    .max(50, "이름은 50자 이내로 입력해주세요"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  district: z.enum(["하남시", "성남시", "송파구"], {
    error: "행정구역을 선택해주세요",
  }),
  apartment: z
    .string()
    .min(1, "아파트를 선택하거나 입력해주세요"),
  dong: z
    .string()
    .min(1, "거주 동을 입력해주세요")
    .max(10, "동 번호를 확인해주세요"),
  comment: z.string().max(200, "200자 이내로 입력해주세요").optional(),
  agreedPrivacy: z.literal(true, {
    error: "개인정보 수집·이용에 동의해주세요",
  }),
});

export type SignatureFormData = z.infer<typeof signatureSchema>;
