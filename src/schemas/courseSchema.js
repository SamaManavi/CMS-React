import { z } from "zod";

export const courseSchema = z.object({
    title: z
        .string()
        .nonempty("عنوان الزامی است")
        .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
        .max(100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

    price: z
        .number( "قیمت باید عدد باشد" )
        .positive("قیمت باید بزرگ‌تر از صفر باشد"),

    category: z.enum(["Web", "Mobile", "Data", "Design","Algorithms", "AI", "Backend"],"دسته‌بندی انتخاب‌شده معتبر نیست"),
});