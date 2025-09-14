Runner.namespace('Runner.lang');

Runner.lang.constants = {

	current_language: "Arabic",

//	for list page
	TEXT_FIRST: 'أول',
	TEXT_PREVIOUS: 'سابق',
	TEXT_NEXT: 'تال',
	TEXT_LAST: 'أخير',
	TEXT_PROCEED_TO: 'انتقل إلى',
	TEXT_DETAIL_NOT_SAVED: 'لم يتم حفظ السجلات في٪ S',
	TEXT_NO_RECORDS: 'لا يوجد أي سجلات ',
	TEXT_DETAIL_GOTO: 'الذهاب إلى',
	TEXT_SHOW_ALL: 'أظهر الكل',
	TEXT_SHOW_OPTIONS: 'تظهر خيارات',
	TEXT_HIDE_OPTIONS: 'إخفاء الخيارات',
	TEXT_SEARCH_SHOW_OPTIONS:'تظهر خيارات البحث',
	TEXT_SEARCH_HIDE_OPTIONS:'إخفاء خيارات البحث',
	TEXT_SHOW_SEARCH_PANEL:'عرض لوحة البحث',
	TEXT_HIDE_SEARCH_PANEL:'إخفاء لوحة البحث',


	TEXT_LOADING: 'تحميل',
	TEXT_DELETE_CONFIRM: 'هَلْ تُريدُ حقاً أَنْ تَحْذفَ هذه السجلاتِ؟',
	TEXT_PAGE: 'صفحة',
	TEXT_PAGEMAX: 'من',

//	for editing pages
	TEXT_INVALID_CAPTCHA_CODE: 'رمز الأمان غير صالحة.',
	TEXT_PLEASE_SELECT: 'إِختار من فضلك',
	TEXT_CTRL_CLICK: 'CTRL + انقر للفرز متعددة',
	TEXT_SAVE: 'حفظ',
	TEXT_CANCEL: 'إلغاء',
	TEXT_PREVIEW: 'معاينة',
	TEXT_HIDE: 'إخفاء',
	TEXT_QUESTION_UNSAVED_CHANGES: 'هل تريد التنقل بعيدا عن هذه الصفحة وتفقد التغييرات التي لم يتم حفظها؟',

	TEXT_EDIT: 'تحرير',
	TEXT_COPY: 'نسخ',
	TEXT_VIEW: 'عرض',
	TEXT_INLINE_EDIT: 'تحرير',
	TEXT_INLINE_ADD: 'إضافة',
	TEXT_AA_P_ADD: 'إضافة',

	TEXT_FIELDFILTER_HINT: 'منقي',

//	for userinfo page
	USERINFO_SENT_EMAIL: 'تم إرسال البريد الإلكتروني مع رمز الحماية ل%email%.',
	USERINFO_ENTER_CODE: 'أدخل هذا الرمز أدناه.',
	USERINFO_SENT_TEXT: 'تم إرسال رسالة نصية مع رمز الحماية ل%phone%.',
	USERINFO_INSTALL_APP1: 'تثبيت التطبيق المصادقة مثل مصادقة Google، Authy، مايكروسوفت الموثق أو ما شابه ذلك على هاتفك.',
	USERINFO_INSTALL_APP2: 'ثم مسح رمز الاستجابة السريعة أدناه مع التطبيق.',
	USERINFO_INSTALL_APP3: 'أو إنشاء رقما قياسيا جديدا في التطبيق يدويا باستخدام هذا المفتاح:',
	USERINFO_INSTALL_APP4: 'ثم أدخل رمز من التطبيق أدناه.',

//	for calendar
	TEXT_MONTH_JAN: 'يناير',
	TEXT_MONTH_FEB: 'فبراير',
	TEXT_MONTH_MAR: 'مارس',
	TEXT_MONTH_APR: 'أبريل',
	TEXT_MONTH_MAY: 'مايو',
	TEXT_MONTH_JUN: 'يونيو',
	TEXT_MONTH_JUL: 'يوليو',
	TEXT_MONTH_AUG: 'أغسطس',
	TEXT_MONTH_SEP: 'سبتمبر',
	TEXT_MONTH_OCT: 'أكتوبر',
	TEXT_MONTH_NOV: 'نوفمبر',
	TEXT_MONTH_DEC: 'ديسمبر',
	TEXT_DAY_SU: 'أحد',
	TEXT_DAY_MO: 'اثنين',
	TEXT_DAY_TU: 'ثلاثاء',
	TEXT_DAY_WE: 'أربعاء',
	TEXT_DAY_TH: 'خميس',
	TEXT_DAY_FR: 'جمعة',
	TEXT_DAY_SA: 'سبت',
	TEXT_TODAY: 'اليوم',
	TEXT_SELECT_DATE: 'حدد التاريخ',
	TEXT_TIME: 'وقت',
	TEXT_TIME_HOUR: 'ساعة',
	TEXT_TIME_MINUTE: 'دقية',
	TEXT_TIME_SECOND: 'ثانية',

//	for inline message
	TEXT_INLINE_FIELD_REQUIRED: 'حقل مطلوب',
	TEXT_INLINE_FIELD_ZIPCODE: 'يجب أن يكون حقل رمز بريدي صالح',
	TEXT_INLINE_FIELD_EMAIL: 'يجب أن يكون حقل عنوان بريد إلكتروني صالح',
	TEXT_INLINE_FIELD_NUMBER: 'يجب أن يكون حقل الرقم صالح',
	TEXT_INLINE_FIELD_CURRENCY: 'يجب أن يكون حقل العملة صالحة',
	TEXT_INLINE_FIELD_PHONE: 'يجب أن يكون حقل رقم هاتف صالح',
	TEXT_INLINE_FIELD_PASSWORD1: 'لا يمكن أن يكون الحقل \'كلمة السر\'',
	TEXT_INLINE_FIELD_PASSWORD2: 'يجب أن يكون حقل 4 أحرف على الأقل',
	TEXT_INLINE_FIELD_STATE: 'يجب أن يكون حقل رقم الضمان الاجتماعي صالحة',
	TEXT_INLINE_FIELD_SSN: 'يجب أن يكون',
	TEXT_INLINE_FIELD_DATE: 'يجب أن يكون حقل تاريخ صالح',
	TEXT_INLINE_FIELD_DATE_NOT_ALLOWED_DAY: '',
	TEXT_INLINE_FIELD_DATE_NOT_IN_INTERVAL: '',
	TEXT_INLINE_FIELD_DATE_EARLIER_THAN_START: '',
	TEXT_INLINE_FIELD_DATE_LATER_THAN_END: '',
	TEXT_INLINE_FIELD_TIME: 'يجب أن يكون حقل وقت صالح في تنسيق 24 ساعة',
	TEXT_INLINE_FIELD_CC: 'يجب أن يكون حقل رقم بطاقة الائتمان سارية المفعول',
	TEXT_INLINE_ERROR: 'حدث خطأ',
	TEXT_INLINE_DENY_DUPLICATES: 'يجب أن لا يحتوي الحقل على قيمة مكررة',
	TEXT_INLINE_USERNAME_EXISTS1: 'اسم المستخدم',
	TEXT_INLINE_USERNAME_EXISTS2: 'مسجل سابقاً. اختر اسم مستخدم آخر',
	TEXT_INLINE_EMAIL_ALREADY1: 'البريد الإلكتروني',
	TEXT_INLINE_EMAIL_ALREADY2: 'مُسجل سابقاً. إذا نسيت اسم المستخدم أو كلمة المرور استخدم استمارة التذكير بكلمة المرور',

	//for RTE
	TEXT_VIEW_SOURCE: 'عرض المصدر',
	//for tree-like menu
	TEXT_EXPAND_ALL: 'توسيع الكل',
	TEXT_COLLAPSE_ALL: 'انهيار جميع',

	//for register page
	SEC_PWD_LEN: 'يجب أن تكون كلمة المرورعلى الاقل ٪٪ طول أحرف.',
	SEC_PWD_CASE: 'يجب أن تحتوي كلمة المرور الأحرف في حالة العلوي والسفلي.',
	SEC_PWD_DIGIT: 'يجب أن تحتوي كلمة السر٪٪ أرقام أو رموز',
	SEC_PWD_UNIQUE: 'يجب أن تحتوي كلمة السر٪٪ شخصيات فريدة',
	PASSWORDS_DONT_MATCH: 'كلمات السر لا تتطابق',
	SUCCES_LOGGED_IN: 'لقد قمت بتسجيل الدخول بنجاح',

	//for pdf
	TEXT_PDF_BUILD1: 'بناء PDF',
	TEXT_PDF_BUILD2: 'فعلت',
	TEXT_PDF_BUILD3: 'لا يمكن إنشاء PDF',

	CLOSE_WINDOW: 'إغلاق النافذة',
	CLOSE: 'غلق',
	RESET: 'تفريغ الحقول',

	//for search options
	CONTAINS: 'يحتوي',
	EQUALS: 'يساوي',
	STARTS_WITH: 'يبدأ بـ ...',
	MORE_THAN: 'أكثر من ...',
	LESS_THAN: 'أقل من ...',
	BETWEEN: 'بين',
	EMPTY: 'تفريغ',

	NOT_CONTAINS: 'لا يحتوي على',
	NOT_EQUALS: 'لا يساوي',
	NOT_STARTS_WITH: 'لا يبدأ مع',
	NOT_MORE_THAN: 'ليس أكثر من',
	NOT_LESS_THAN: 'ليس أقل من',
	NOT_BETWEEN: 'ليس بين',
	NOT_EMPTY: 'ليس فارغا',

	SEARCH_FOR: 'إبحث عن',

	ERROR_MISSING_FILE_NAME: 'لم يتم توفير اسم الملف',
	ERROR_ACCEPT_FILE_TYPES: 'نوع الملف غير مقبول',
	ERROR_MAX_FILE_SIZE: 'حجم الملف يتجاوز حد كيلوبايت٪ S',
	ERROR_MIN_FILE_SIZE: 'يجب أن لا يكون حجم الملف أقل من٪ S ك بايت',
	ERROR_MAX_TOTAL_FILE_SIZE: 'إجمالي الملفات حجم يتجاوز حد كيلوبايت٪ S',
	ERROR_MAX_NUMBER_OF_FILES_ONE: 'يمكنك تحميل ملف واحد فقط',
	ERROR_MAX_NUMBER_OF_FILES_MANY: 'يمكنك تحميل أي ملفات أكثر من٪ S',

	TEXT_SERVER_ERROR_OCCURRED: 'حدث خطأ الخادم',
	TEXT_SEE_DETAILS: 'انظر التفاصيل',

	ERROR_UPLOAD: 'فشل تحميل',
	START_UPLOAD: 'تحميل',
	CANCEL: 'إلغاء',
	DELETE: 'مسح',

	UPLOAD_DRAG: 'سحب الملفات هنا',

	SELECT_ALL: 'تحديد كافة',
	UNSELECT_ALL: 'إلغاء تحديد الكل',

	TEXT_WR_REPORT_SAVED: 'تقرير محفوظ',
	TEXT_WR_SOME_PROBLEM: 'تظهر بعض المشاكل خلال الحفظ',
	TEXT_WR_CROSS_GROUP: 'مجموعة',
	TEXT_WR_HEADER: 'الرائسي',
	TEXT_WR_CROSS_GROUP: 'مجموعة',
	TEXT_COUNT: 'تعداد',
	TEXT_MIN: 'أدنى',
	TEXT_MAX: 'أقصى',
	TEXT_SUM: 'المجموع',
	TEXT_AVG: 'المتوسط',
	TEXT_WR_TOTAL_DATA: 'بيانات الجدول',
	TEXT_PAGE_SUMMARY: 'ملخص الصفحة',
	TEXT_GLOBAL_SUMMARY: 'الملخص العام',
	TEXT_WR_SUMMARY: 'ملخص',
	TEXT_FIELD: 'حقل',
	TEXT_WR_NO_COLOR: 'رسم',

	TEXT_SEARCH_SAVING: 'بحث الادخار',
	TEXT_SEARCH_NAME: 'اسم البحث:',
	TEXT_DELETE_SEARCH_CAPTION: 'حذف بحث محفوظ',
	TEXT_DELETE_SEARCH: 'هل حقا تريد حذف هذا البحث؟',
	TEXT_YES: 'نعم',
	TEXT_NO: 'لا',

	TEXT_FILTER_APPLY: 'تطبق',
	TEXT_FILTER_CLEAR: 'مسح',
	TEXT_FILTER_MULTISELECT: 'متعدد الخيارات',

	// for rights page
	AA_ADD_NEW_GROUP: 'إضافة مجموعة جديدة',
	AA_RENAMEGROUP: 'إعادة تسمية مجموعة',
	AA_GROUP_NEW: 'محموعة الأخبار',
	AA_DELETEGROUP: 'هل حقا تريد حذف المجموعة',
	AA_COPY_PERMISS_FROM: 'اختيار مجموعة لنسخ الأذونات من :',
	AA_CHOOSE_COLUMNS_TO_DIPLAY: 'اختيار أعمدة لعرضها',
	AA_SELECT_NONE: 'لا تختر شيء',
	AA_OK: 'موافق',

	PREPARE_PAGE_FOR_PRINTING: 'إعداد الصفحة للطباعة',

	// import page
	IMPORT_PROCESSING_RECORDS: 'معالجة البيانات',
	IMPORT_FAILED: 'فشل استيراد',

	LOADING_FONTS: 'الخطوط تحميل',

	DATEPICKER_CLOSE: '',
	DATEPICKER_SELECT_MONTH: 'اختر الشهر',
	DATEPICKER_NEXT_MONTH: 'الشهر القادم',
	DATEPICKER_PREV_MONTH: 'الشهر الماضى',
	DATEPICKER_SELECT_YEAR: 'اختر السنة',
	DATEPICKER_NEXT_YEAR: 'العام القادم',
	DATEPICKER_PREV_YEAR: 'العام القادم',

	TODAY: 'اليوم',
	TIME: 'وقت',
	TIME_HOUR: 'ساعة',
	TIME_MINUTE: 'دقية',
	SELECT_DATE: 'حدد التاريخ',

	SESSION_EXPIRED_COMMENT: 'لأسباب أمنية، ستستمر دورتك في %seconds% ثانية ما لم تستمر',

	NOW: 'الآن',
	NOTI_SECOND: '',
	NOTI_MINUTE: 'دقائق',
	NOTI_HOUR: 'ساعات',
	NOTI_DAY: 'ايام',

	
	EXPORT_TO_PDF: 'تصدير إلى PDF',
	EXPORT_TO_CSV: 'التصدير إلى CSV',
	SAVE_AS_PNG: 'حفظ كما PNG',
	PRINT: 'طباعة',

	TWOFACTOR_VERIFICATION: 'التحقق ثنائي العوامل',
	EMAIL: 'Email',
	TWO_FACTOR_PARAM_EMAIL: 'عنوان بريد الكتروني', 
	TWO_FACTOR_PARAM_PHONE: 'رقم الهاتف', 
};

Runner.lang.customlabels = {

	prefix: 'CUSTOM_LABEL_',

	// custom labels
};