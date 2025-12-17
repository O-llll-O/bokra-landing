# ✅ فحص GitHub Actions - دليل التحقق

## 🔍 خطوات التحقق:

### 1️⃣ التحقق من ملف Workflow

✅ **الملف موجود:** `.github/workflows/firebase-deploy.yml`

**المحتوى:**
- ✅ Trigger: Push to `main` branch
- ✅ Node.js: v18
- ✅ Firebase CLI: يتم تثبيته تلقائياً
- ✅ Project ID: `bokra-44bc4`
- ✅ Site: يستخدم من `firebase.json` (bokra-44bc4)

---

### 2️⃣ التحقق من Firebase Configuration

✅ **firebase.json:**
- ✅ Site: `bokra-44bc4` (صحيح)
- ✅ Public folder: `public`
- ✅ Rewrites: موجودة
- ✅ Headers: موجودة

---

### 3️⃣ التحقق من GitHub Secrets (مهم جداً!)

**يجب التحقق يدوياً:**

1. اذهب إلى: https://github.com/O-llll-O/bokra-landing/settings/secrets/actions

2. تأكد من وجود Secret باسم:
   - ✅ `FIREBASE_SERVICE_ACCOUNT`

3. إذا لم يكن موجوداً:
   - ❌ **GitHub Actions لن يعمل**
   - يجب إضافته أولاً

---

### 4️⃣ اختبار GitHub Actions

**الطريقة 1: رفع تعديل بسيط**

```bash
# تعديل بسيط للاختبار
echo "<!-- Test deployment -->" >> public/index.html

# رفع التعديل
git add public/index.html
git commit -m "Test GitHub Actions deployment"
git push origin main
```

**الطريقة 2: فحص Actions Tab**

بعد الرفع:
1. اذهب إلى: https://github.com/O-llll-O/bokra-landing/actions
2. يجب أن ترى workflow جديد يعمل
3. اضغط عليه لرؤية التفاصيل

**النتائج المتوقعة:**
- ✅ إذا نجح: سترى ✅ ورسالة "Deploy complete!"
- ❌ إذا فشل: سترى ❌ ورسالة خطأ

---

### 5️⃣ المشاكل الشائعة وحلولها

#### المشكلة 1: Workflow لا يعمل بعد Push

**الأسباب المحتملة:**
- ❌ لا يوجد `FIREBASE_SERVICE_ACCOUNT` Secret
- ❌ الملف `.github/workflows/firebase-deploy.yml` غير موجود في GitHub
- ❌ التعديلات ليست في branch `main`

**الحل:**
```bash
# تأكد من أنك على branch main
git branch

# تأكد من رفع workflow file
git add .github/workflows/firebase-deploy.yml
git commit -m "Add workflow file"
git push origin main
```

---

#### المشكلة 2: خطأ في Firebase Authentication

**الرسالة:**
```
Error: Could not load the default credentials
```

**السبب:**
- ❌ `FIREBASE_SERVICE_ACCOUNT` Secret غير موجود أو غير صحيح

**الحل:**
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. Project Settings → Service Accounts
3. Generate New Private Key
4. انسخ محتوى JSON بالكامل
5. أضفه في GitHub Secrets

---

#### المشكلة 3: خطأ في Project ID

**الرسالة:**
```
Error: Failed to get Firebase project
```

**السبب:**
- ❌ Project ID غير صحيح في workflow

**الحل:**
- تأكد من أن `projectId: bokra-44bc4` صحيح في workflow

---

### 6️⃣ التحقق من آخر Deployment

**في GitHub:**
1. اذهب إلى: https://github.com/O-llll-O/bokra-landing/actions
2. ابحث عن آخر workflow run
3. اضغط عليه لرؤية التفاصيل

**في Firebase:**
1. اذهب إلى: https://console.firebase.google.com/project/bokra-44bc4/hosting
2. ستجد آخر deployment مع التاريخ والوقت

---

## ✅ قائمة التحقق النهائية:

- [ ] ملف `.github/workflows/firebase-deploy.yml` موجود
- [ ] `firebase.json` يحتوي على `site: "bokra-44bc4"`
- [ ] `FIREBASE_SERVICE_ACCOUNT` Secret موجود في GitHub
- [ ] آخر commit على branch `main`
- [ ] Actions tab في GitHub يعرض workflows

---

## 🧪 اختبار سريع:

قم بتنفيذ هذا الأمر لاختبار GitHub Actions:

```bash
# تعديل بسيط
echo "<!-- GitHub Actions Test $(date) -->" >> public/index.html

# حفظ ورفع
git add public/index.html
git commit -m "Test GitHub Actions"
git push origin main

# انتظر 1-2 دقيقة ثم تحقق من:
# https://github.com/O-llll-O/bokra-landing/actions
```

---

## 📊 حالة الإعداد الحالية:

✅ **Workflow File:** موجود وصحيح  
✅ **Firebase Config:** صحيح  
⚠️ **GitHub Secret:** يجب التحقق يدوياً  
✅ **Project ID:** bokra-44bc4  
✅ **Site ID:** bokra-44bc4  

---

## 🎯 الخطوة التالية:

**الأهم:** تحقق من وجود `FIREBASE_SERVICE_ACCOUNT` Secret في GitHub:
https://github.com/O-llll-O/bokra-landing/settings/secrets/actions

إذا كان موجوداً → GitHub Actions جاهز ✅  
إذا لم يكن موجوداً → يجب إضافته أولاً ❌

