<div dir="rtl">

# جعبه‌ابزار ادیت ویدیو با هوش مصنوعی 🎬

راهنمای ساده و قدم‌به‌قدم برای اینکه افکت‌های حرفه‌ای (مثل `orbit`، `spotlight`، `glass-widgets`، `timeline` و ...) را با کمک **Claude Code** روی ویدیوهای خودتان بگذارید؛ بدون نیاز به بلد بودن برنامه‌نویسی.

🎬 **کتابخانه‌ی ۴۵ افکت:** سایت این راهنما برای هر ۴۵ افکت یک پیش‌نمایش ویدیویی، توضیح فارسی و پرامپت آماده دارد؛ با جست‌وجو، دسته‌بندی و ساختن پرامپت ترکیبی. همه‌ی پیش‌نمایش‌ها را با اجرای کد اصلی افکت‌ها روی ویدیوی خودم ساخته‌ام.

🌐 **نسخه‌ی وب این راهنما (خواناتر روی موبایل):** بعد از انتشار، در آدرس `https://<نام-کاربری-گیت‌هاب>.github.io/ai-video-editing-toolkit/` در دسترس است.

> ⚠️ **مهم:** افکت‌ها و کدِ اصلی را **من نساخته‌ام**. آن‌ها کارِ [Vibha Ramprakash](https://github.com/Vibha-Ramprakash) هستند و در پروژه‌ی متن‌باز [claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects) منتشر شده‌اند. این مخزن فقط یک **راهنمای آموزشی فارسی** است و هیچ کدی از آن پروژه را در خودش ندارد. (جزئیات در بخش [قدردانی و مجوز](#credits))

---

## فهرست

1. [این راهنما چه کاری می‌کند؟](#how)
2. [پیش‌نیازها](#prereq)
3. [نصب روی مک (macOS)](#mac)
4. [نصب روی ویندوز](#win)
5. [پرامپت‌های آماده برای Claude Code](#prompts)
6. [خطاهای رایج و راه‌حل](#errors)
7. [قدردانی و مجوز](#credits)

---

<a id="how"></a>

## این راهنما چه کاری می‌کند؟

**Claude Code** دستیار هوش مصنوعی شرکت Anthropic است که می‌تواند روی کامپیوتر شما فایل بسازد، برنامه نصب کند و دستور اجرا کند. شما فقط به زبان ساده (انگلیسی) می‌گویید چه می‌خواهید.

پروژه‌ی **claude-video-effects** یک «مهارت» (Skill) برای Claude Code است. وقتی نصبش کنید، کافی است ویدیوی خودتان را به Claude بدهید و بنویسید مثلاً `/effects orbit from 3 to 6 seconds`. Claude صورت شما را در ویدیو پیدا می‌کند، افکت را طوری می‌گذارد که روی صورتتان نیفتد و یک فایل جدید کنار ویدیوی اصلی می‌سازد. صدای ویدیو دست نمی‌خورد.

خلاصه‌ی مسیر:

1. ابزارها را نصب می‌کنید (یک بار برای همیشه).
2. مهارت افکت‌ها را نصب می‌کنید (یک بار).
3. ویدیو را می‌دهید و افکت را می‌خواهید.
4. خروجی مخصوص اینستاگرام می‌گیرید.

---

<a id="prereq"></a>

## پیش‌نیازها

این‌ها را از روی فایل‌های خودِ پروژه‌ی اصلی (`README`، `requirements.txt` و `scripts/setup.sh`) استخراج کرده‌ام:

| ابزار | به چه دردی می‌خورد؟ | لازم است؟ |
|---|---|---|
| **Claude Code** | دستیاری که همه‌ی کارها را برایتان انجام می‌دهد. به اشتراک پولی Claude (مثل Pro یا Max) نیاز دارد. | ✅ بله |
| **Git** | برای دانلود (clone) پروژه از گیت‌هاب. روی ویندوز، Claude Code خودش هم به Git نیاز دارد. | ✅ بله |
| **Python نسخه‌ی ۳٫۱۰ یا جدیدتر** | زبانی که افکت‌ها با آن نوشته شده‌اند (نسخه‌ی ۳٫۱۲ پیشنهاد می‌شود). | ✅ بله |
| **FFmpeg** (همراه با `ffprobe`) | موتور اصلی خواندن و ساختن فایل ویدیو. | ✅ بله |
| کتابخانه‌های پایتون: `numpy`، `opencv-python`، `pillow`، `mediapipe` | تشخیص صورت، جدا کردن آدم از پس‌زمینه و طراحی افکت‌ها. **خودکار نصب می‌شوند.** | ✅ (خودکار) |
| `faster-whisper` | برای پیدا کردن زمان دقیق هر کلمه، وقتی می‌گویید «وقتی گفتم ...». بار اول خودکار نصب می‌شود. | اختیاری (خودکار) |
| **Homebrew** (فقط مک) / **winget** (فقط ویندوز) | «فروشگاه» نصب برنامه از طریق ترمینال. winget معمولاً روی ویندوز ۱۰ و ۱۱ از قبل هست. | پیشنهادی |
| **حساب GitHub** | برای دانلود لازم نیست؛ فقط اگر بخواهید پروژه را ستاره بزنید یا نسخه‌ی خودتان را منتشر کنید. | اختیاری |

> 💡 لازم نیست همه‌ی این‌ها را دستی نصب کنید. در بخش پرامپت‌ها، یک پرامپت آماده هست که از Claude می‌خواهد خودش بررسی و نصب کند.

---

<a id="mac"></a>

## نصب روی مک (macOS)

### قدم ۱: باز کردن ترمینال
کلید `⌘ Command` + `Space` را بزنید، بنویسید `Terminal` و Enter بزنید.

### قدم ۲: نصب Claude Code
این خط را در ترمینال کپی کنید و Enter بزنید:

<div dir="ltr">

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

</div>

بعد بنویسید `claude` و Enter بزنید. بار اول از شما می‌خواهد وارد حساب Claude شوید. (اگر ترجیح می‌دهید، نسخه‌ی دسکتاپ Claude را از [claude.ai/download](https://claude.ai/download) بگیرید و از تب **Code** استفاده کنید.)

### قدم ۳: نصب Homebrew، Git، Python و FFmpeg
اگر Homebrew ندارید، دستور نصبش را از [brew.sh](https://brew.sh) کپی کنید. بعد:

<div dir="ltr">

```bash
brew install git python@3.12 ffmpeg
```

</div>

> یا ساده‌تر: داخل Claude Code **پرامپت شماره‌ی ۱** را بفرستید تا خودش انجام دهد.

### قدم ۴: نصب مهارت افکت‌ها

<div dir="ltr">

```bash
git clone https://github.com/Vibha-Ramprakash/claude-video-effects ~/.claude/skills/effects
```

</div>

### قدم ۵: Claude Code را ببندید و دوباره باز کنید
حالا `/effects` آماده است. بار اول که از آن استفاده کنید، Claude حدود ۱ تا ۳ دقیقه وقت می‌گذارد تا کتابخانه‌ها را نصب کند.

---

<a id="win"></a>

## نصب روی ویندوز

### قدم ۱: باز کردن PowerShell
روی دکمه‌ی Start کلیک کنید، بنویسید `PowerShell` و بازش کنید.

### قدم ۲: نصب Git
Claude Code روی ویندوز به **Git for Windows** نیاز دارد (Git Bash هم همراهش نصب می‌شود که اسکریپت نصب افکت‌ها به آن احتیاج دارد):

<div dir="ltr">

```powershell
winget install --id Git.Git -e
```

</div>

بعد از نصب، PowerShell را ببندید و دوباره باز کنید.

### قدم ۳: نصب Claude Code

<div dir="ltr">

```powershell
irm https://claude.ai/install.ps1 | iex
```

</div>

بعد بنویسید `claude` و وارد حسابتان شوید. (نسخه‌ی دسکتاپ هم از [claude.ai/download](https://claude.ai/download) در دسترس است.)

### قدم ۴: نصب Python و FFmpeg

<div dir="ltr">

```powershell
winget install Python.Python.3.12
winget install ffmpeg
```

</div>

دوباره PowerShell را ببندید و باز کنید تا ابزارهای جدید شناخته شوند.

### قدم ۵: نصب مهارت افکت‌ها

<div dir="ltr">

```powershell
git clone https://github.com/Vibha-Ramprakash/claude-video-effects $HOME\.claude\skills\effects
```

</div>

### قدم ۶: Claude Code را ببندید و دوباره باز کنید
تمام! حالا `/effects` کار می‌کند.

---

<a id="prompts"></a>

## پرامپت‌های آماده برای Claude Code

پرامپت‌ها عمداً **انگلیسی** هستند تا Claude دقیق‌ترین نتیجه را بدهد. فقط کپی کنید و داخل Claude Code بفرستید. هرجا `[...]` دیدید، با اطلاعات خودتان عوض کنید.

### ۱) نصب ابزارها

<div dir="ltr">

```text
I'm a beginner with no programming experience. Please check whether these are installed on my computer: Git, Python 3.10 or newer, FFmpeg and ffprobe. Install anything that is missing (on macOS use Homebrew, on Windows use winget). Explain each step in one simple sentence, and ask me before running anything that needs my password or admin rights. When you're done, show me the installed version of each tool.
```

</div>

### ۲) نصب و راه‌اندازی افکت‌ها

<div dir="ltr">

```text
Install the video effects skill from https://github.com/Vibha-Ramprakash/claude-video-effects into ~/.claude/skills/effects (on Windows use $HOME\.claude\skills\effects). If the folder already exists, update it with git pull instead of deleting it. Then run its scripts/setup.sh once and wait until it prints READY. If it prints NEED_FFMPEG or NEED_PYTHON, install what's missing and run it again. Finally, tell me if I need to restart Claude Code.
```

</div>

### ۳) گذاشتن افکت روی ویدیوی خودتان

اول ویدیو را داخل پنجره‌ی Claude بکشید (Drag & Drop). بعد یکی از این‌ها:

<div dir="ltr">

```text
/effects orbit from 3 to 6 seconds
```

```text
/effects spotlight when I say "[a word from your video]", with the word [YOUR WORD] glowing behind me
```

```text
Use the effects skill on my video [drag your video here]. Add "glass-widgets" for the first 3 seconds, then "backdrop-word" with the text "[YOUR WORD]" when I say "[a word from your video]". Before rendering, show me check frames and make sure nothing covers my face. Keep my original audio and save the result as a new file next to my video. Don't overwrite my original.
```

</div>

> 🎯 هر ۴۵ افکت با پیش‌نمایش و پرامپت آماده در کتابخانه‌ی افکت‌های سایت است (`docs/index.html`).

### ۴) خروجی آماده برای اینستاگرام (۱۰۸۰×۱۹۲۰)

<div dir="ltr">

```text
Take my rendered video [file name]_effects.mp4 and export an Instagram Reels version with FFmpeg:
- 1080x1920 (9:16). Scale to fit and crop if needed, never stretch.
- H.264 (libx264, High profile), pixel format yuv420p, 30 fps
- Video bitrate about 10 Mbps (maxrate 12M, bufsize 20M)
- AAC audio, 128 kbps, 48 kHz (keep the original audio)
- Add +faststart
Save it as [file name]_instagram.mp4 next to the original and don't overwrite any file. Then run ffprobe and show me the resolution, codec, fps and bitrate to confirm.
```

</div>

برای کسانی که می‌خواهند خودشان دستور را اجرا کنند، این همان کار را انجام می‌دهد:

<div dir="ltr">

```bash
ffmpeg -i input_effects.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" -c:v libx264 -profile:v high -pix_fmt yuv420p -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 128k -ar 48000 -movflags +faststart output_instagram.mp4
```

</div>

### ۵) رفع خطا

<div dir="ltr">

```text
I got this error while using the effects skill:

[paste the full error here]

Explain in simple words what it means, find the cause, fix it, and tell me exactly what you changed. Don't delete or overwrite my videos.
```

```text
The effect doesn't look right: [describe what you see, e.g. "the word covers my face" or "it's too fast"]. Please show me check frames, adjust the plan, and render again as a new file.
```

</div>

---

<a id="errors"></a>

## خطاهای رایج و راه‌حل

| مشکل | دلیل احتمالی | راه‌حل |
|---|---|---|
| `command not found: ffmpeg` یا `NEED_FFMPEG` | FFmpeg نصب نیست یا ترمینال هنوز آن را نمی‌شناسد. | مک: `brew install ffmpeg` / ویندوز: `winget install ffmpeg`. بعد ترمینال را ببندید و باز کنید. |
| `NEED_PYTHON` | پایتون نیست یا نسخه‌اش قدیمی‌تر از ۳٫۱۰ است. | مک: `brew install python@3.12` / ویندوز: `winget install Python.Python.3.12` |
| Claude دستور `/effects` را نمی‌شناسد | مهارت در پوشه‌ی درست نیست یا Claude Code ری‌استارت نشده. | مطمئن شوید پوشه دقیقاً `~/.claude/skills/effects` است و فایل `SKILL.md` داخلش هست. بعد Claude Code را ببندید و باز کنید. |
| `brew: command not found` (مک) | Homebrew نصب نیست. | از [brew.sh](https://brew.sh) نصبش کنید. |
| `winget` شناخته نمی‌شود (ویندوز) | App Installer قدیمی است. | App Installer را از Microsoft Store به‌روز کنید. |
| `bash` روی ویندوز پیدا نمی‌شود | Git for Windows نصب نیست. | `winget install --id Git.Git -e` |
| نوشته یا افکت روی صورت افتاده | زمان‌بندی یا متن خیلی بلند است. | پرامپت دوم بخش «رفع خطا» را بفرستید. |
| بار اول خیلی طول می‌کشد | نصب کتابخانه‌ها و مدل تشخیص کلمه. | طبیعی است؛ ۱ تا ۳ دقیقه صبر کنید (برای تشخیص کلمه کمی بیشتر). |

**نکته‌های طلایی:**
- ویدیوی عمودی که خودتان در کادر هستید بهترین نتیجه را می‌دهد.
- هر افکت را کوتاه نگه دارید (۱٫۵ تا ۴ ثانیه).
- این افکت‌ها «نسخه‌ی اولیه» هستند. همیشه قبل از پست کردن، خروجی را نگاه کنید.
- صدا و زیرنویس اضافه نمی‌شود؛ آن‌ها را در CapCut یا برنامه‌ی دلخواهتان اضافه کنید.

---

<a id="credits"></a>

## قدردانی و مجوز

### 💛 سازنده‌ی افکت‌ها: Vibha Ramprakash
- همه‌ی افکت‌ها، کد و ایده‌ی اصلی متعلق به **Vibha Ramprakash** است.
- مخزن اصلی: [github.com/Vibha-Ramprakash/claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects)
- اینستاگرام: [@vibha.in.progress](https://instagram.com/vibha.in.progress)
- **مجوز پروژه‌ی اصلی: MIT** (© 2026 Vibha Ramprakash). فونت‌ها و مدل‌های داخل آن پروژه مجوزهای خودشان را دارند: تشخیص صورت OpenCV YuNet (MIT)، MediaPipe Selfie Segmenter (Apache 2.0) و فونت‌ها (SIL OFL و Apache 2.0).
- این مخزن **هیچ کد، تصویر یا متنی** از پروژه‌ی اصلی را کپی نکرده است؛ فقط به آن لینک می‌دهد و روش دانلودش را آموزش می‌دهد. همه‌ی توضیحات فارسی این‌جا نوشته‌ی خود من است.
- ویدیوهای پیش‌نمایش (`docs/previews/`) را با اجرای کد اصلی (`scripts/fx.py`) روی ویدیوهای خودم ساخته‌ام. تنها تغییر برای این رندرها: هندل `@vibha.in.progress` که در افکت `headline-wall` ثابت نوشته شده بود، با `@yekta_journal` جایگزین شد.
- این راهنما رسمی نیست و از طرف Vibha یا Anthropic تأیید نشده است.

### مجوز همین راهنما
- متن و محتوای آموزشی این مخزن تحت مجوز **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** منتشر شده است (فایل [`LICENSE`](LICENSE)): آزادید استفاده، ترجمه یا بازنشر کنید، فقط نام منبع را ذکر کنید.
- کدهای کوچک سایت (HTML/CSS/JS در پوشه‌ی `docs/`) تحت مجوز **MIT** هستند (فایل [`LICENSE-CODE`](LICENSE-CODE)).
- ویدیوها و تصاویر پیش‌نمایش در `docs/previews/` تصویر خود من هستند: **© Yekta Ghafelehbashi، همه‌ی حقوق محفوظ است** و شامل مجوزهای بالا نمی‌شوند.

---

ساخته‌شده با ❤️ توسط **Yekta Ghafelehbashi** · اینستاگرام: [@yekta_journal](https://instagram.com/yekta_journal)

</div>
