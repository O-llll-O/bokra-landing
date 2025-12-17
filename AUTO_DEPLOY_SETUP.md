# 🚀 إعداد النشر التلقائي - GitHub Actions

## ✅ الحالة الحالية:

### ملف Workflow موجود وصحيح ✅
- الملف: `.github/workflows/firebase-deploy.yml`
- Trigger: Push to `main` branch
- Project: `bokra-44bc4`
- Site: `bokra-44bc4`

---

## 🔧 خطوات التأكد من عمل GitHub Actions:

### 1️⃣ التحقق من GitHub Secrets (مهم جداً!)

**اذهب إلى:**
```
https://github.com/O-llll-O/bokra-landing/settings/secrets/actions
```

**يجب أن يكون موجود:**
- ✅ `FIREBASE_SERVICE_ACCOUNT`

**إذا لم يكن موجوداً:**

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر المشروع: **bokra-44bc4**
3. Settings ⚙️ → **Project Settings** → **Service Accounts**
4. اضغط **Generate New Private Key**
5. احفظ ملف JSON
6. في GitHub:
   - Settings → Secrets → Actions → **New repository secret**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: انسخ محتوى ملف JSON بالكامل
   - اضغط **Add secret**

---

### 2️⃣ اختبار GitHub Actions

**قم بتعديل بسيط وارفع:**

```bash
# تعديل بسيط
echo "<!-- Auto-deploy test -->" >> public/index.html

# حفظ ورفع
git add public/index.html
git commit -m "Test auto-deployment"
git push origin main
```

**بعد الرفع:**
1. انتظر 10-20 ثانية
2. اذهب إلى: https://github.com/O-llll-O/bokra-landing/actions
3. يجب أن ترى workflow جديد يعمل

**النتائج:**
- ✅ إذا نجح: سترى ✅ ورسالة "Deploy complete!"
- ❌ إذا فشل: سترى ❌ ورسالة خطأ

---

### 3️⃣ متابعة حالة النشر

**في GitHub:**
- اذهب إلى: https://github.com/O-llll-O/bokra-landing/actions
- اضغط على آخر workflow run
- ستجد تفاصيل كاملة عن النشر

**في Firebase:**
- اذهب إلى: https://console.firebase.google.com/project/bokra-44bc4/hosting
- ستجد آخر deployment مع التاريخ والوقت

---

## 📋 كيف يعمل النشر التلقائي:

1. **أنت تعدل الملفات** في المشروع
2. **تحفظ التعديلات:**
   ```bash
   git add .
   git commit -m "Update design"
   ```
3. **ترفع إلى GitHub:**
   ```bash
   git push origin main
   ```
4. **GitHub Actions يعمل تلقائياً:**
   - يكتشف الـ push
   - يشغّل workflow
   - ينشر إلى Firebase Hosting
5. **الموقع يُحدّث تلقائياً** خلال 1-2 دقيقة

---

## ⚠️ المشاكل الشائعة:

### المشكلة 1: Workflow لا يعمل بعد Push

**الأسباب:**
- ❌ لا يوجد `FIREBASE_SERVICE_ACCOUNT` Secret
- ❌ التعديلات ليست في branch `main`
- ❌ ملف workflow غير موجود في GitHub

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

### المشكلة 2: خطأ في Firebase Authentication

**الرسالة:**
```
Error: Could not load the default credentials
```

**السبب:**
- ❌ `FIREBASE_SERVICE_ACCOUNT` Secret غير موجود أو غير صحيح

**الحل:**
- أضف Secret كما هو موضح في الخطوة 1

---

### المشكلة 3: خطأ في Project ID

**الرسالة:**
```
Error: Failed to get Firebase project
```

**الحل:**
- تأكد من أن `projectId: bokra-44bc4` صحيح في workflow

---

## ✅ قائمة التحقق:

- [ ] ملف `.github/workflows/firebase-deploy.yml` موجود
- [ ] `FIREBASE_SERVICE_ACCOUNT` Secret موجود في GitHub
- [ ] `firebase.json` يحتوي على `site: "bokra-44bc4"`
- [ ] آخر commit على branch `main`
- [ ] Actions tab في GitHub يعرض workflows

---

## 🎯 الخطوة التالية:

**الأهم:** تحقق من وجود `FIREBASE_SERVICE_ACCOUNT` Secret:
https://github.com/O-llll-O/bokra-landing/settings/secrets/actions

إذا كان موجوداً → GitHub Actions جاهز ✅  
إذا لم يكن موجوداً → يجب إضافته أولاً ❌

---

## 📝 ملاحظات:

1. **GitHub Actions يعمل فقط عند Push إلى `main` branch**
2. **التعديلات في مجلد `public/` فقط تسبب النشر**
3. **يمكنك متابعة حالة النشر من Actions tab**
4. **النشر يستغرق 1-2 دقيقة عادة**

---

## 🔍 اختبار سريع:

```bash
# تعديل بسيط
echo "<!-- Test $(Get-Date) -->" >> public/index.html

# حفظ ورفع
git add public/index.html
git commit -m "Test GitHub Actions"
git push origin main

# انتظر 1-2 دقيقة ثم تحقق من:
# https://github.com/O-llll-O/bokra-landing/actions
# https://bokra-44bc4.web.app
```

