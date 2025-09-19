# موقع جيوكتيك (Jekyll)

هذا المستودع يعد موقعًا ثابتًا مبنيًا باستخدام Jekyll داخل مجلد docs.

كيفية التشغيل محليًا

1. تثبيت الاعتماديات (إن كان المشروع يستخدم bundler):

   gem install bundler
   bundle install

2. تشغيل خادم Jekyll محليًا من جذر المشروع باستخدام مجلد المصدر docs:

   bundle exec jekyll serve --source docs --watch

ثم افتح: http://localhost:4000

النشر على GitHub Pages

هذا المستودع يستخدم GitHub Pages مع نشر مباشر من فرع main:/docs. 

1. افتح إعدادات المستودع (Settings → Pages).
2. اختر الفرع: main والمجلد: /docs ثم احفظ.
3. انتظر بضع دقائق حتى يتم النشر.

ملاحظة هامة: ملفات GitHub Actions في هذا المستودع تقوم ببناء الموقع للتحقق من صحته فقط ولا تنشر إلى فرع gh-pages. النشر يتم مباشرة من main:/docs.

للتحويل إلى نشر عبر gh-pages مستقبلاً (إذا رغب المالك في ذلك):
- يمكن إضافة خطوة النشر إلى deploy.yml workflow باستخدام peaceiris/actions-gh-pages action.
- تغيير إعدادات Pages لتستخدم فرع gh-pages بدلاً من main:/docs.

ملفات مضافة/محدّثة
- README.md — هذا الملف.
- docs/assets/images/favicon.svg — أيقونة موقع بسيطة بصيغة SVG.
- robots.txt — قواعد أساسية لعناكب البحث.
- _config.yml — تم تحديث title و description بقيم افتراضية قابلة للتعديل.

Contact

إذا رغبت، أستطيع تحديث التصميم أو إضافة ميزات إضافية للموقع.
