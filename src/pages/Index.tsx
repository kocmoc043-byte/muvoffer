import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneMock from "@/components/PhoneMock";
import { exportPdf } from "@/lib/exportPdf";
import screen1 from "@/assets/screens/screen-1.png";
import screen2 from "@/assets/screens/screen-2.png";
import screen3 from "@/assets/screens/screen-3.png";
import screen4 from "@/assets/screens/screen-4.png";
import screen5 from "@/assets/screens/screen-5.png";
import {
  Download,
  Loader2,
  UserPlus,
  Camera,
  Video,
  Dumbbell,
  Sparkles,
  Sun,
  Mic,
  RectangleHorizontal,
  Clock,
  Globe,
  Send,
  Instagram,
  Youtube,
  Check,
} from "lucide-react";

const Section = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="relative" data-pdf-section>
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground font-bold text-xl shadow-[var(--shadow-glow)]">
        {number}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
);

const Card = ({
  icon: Icon,
  title,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl bg-surface-elevated/60 backdrop-blur p-6 ring-1 ring-brand/15 hover:ring-brand/40 transition-all">
    <div className="flex items-start gap-3 mb-3">
      {Icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/15 text-brand-glow shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className="text-lg font-semibold leading-tight pt-1.5">{title}</h3>
    </div>
    <div className="text-muted-foreground leading-relaxed text-[15px]">{children}</div>
  </div>
);

const Index = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await exportPdf("[data-pdf-root]", "MUV-trainer-brief.pdf");
    } finally {
      setExporting(false);
    }
  };

  return (
    <main data-pdf-root className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <header className="relative overflow-hidden" data-pdf-section>
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-glow/20 blur-3xl" />

        <div className="relative container max-w-6xl py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 ring-1 ring-brand/30 px-4 py-1.5 text-sm text-brand-glow mb-6">
            <Sparkles className="w-4 h-4" />
            Техническое задание для тренеров
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Стань тренером в{" "}
            <span className="text-brand-glow">
              MUV
            </span>{" "}
            — фитнес-платформе нового поколения
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Простое пошаговое руководство: регистрация, оформление профиля и загрузка тренировок.
            На всё уйдёт 30–60 минут вашего времени.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand to-brand-glow hover:opacity-90 text-brand-foreground font-semibold"
            >
              <a href="https://muv-app.ru/" target="_blank" rel="noreferrer">
                <Globe className="w-4 h-4 mr-2" /> muv-app.ru
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-brand/40 hover:bg-brand/10"
            >
              <a
                href="https://apps.apple.com/ru/app/%D0%BC%D1%83%D0%B2/id6746817734"
                target="_blank"
                rel="noreferrer"
              >
                App Store
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-brand/40 hover:bg-brand/10"
            >
              <a
                href="https://www.rustore.ru/catalog/app/com.muv.fitness"
                target="_blank"
                rel="noreferrer"
              >
                RuStore
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={handleExport}
              disabled={exporting}
              className="hover:bg-brand/10 no-print"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {exporting ? "Готовим PDF…" : "Скачать PDF"}
            </Button>
          </div>

          {/* Phones row */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-4">
            <PhoneMock src={screen1} alt="Регистрация в MUV" rotate="-6deg" />
            <PhoneMock src={screen2} alt="Профиль тренера" rotate="3deg" />
            <PhoneMock src={screen3} alt="Информация о тренере" rotate="-3deg" />
            <PhoneMock src={screen4} alt="Карточка тренировки" rotate="4deg" />
            <PhoneMock src={screen5} alt="Плеер тренировки" rotate="-5deg" />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="container max-w-6xl py-20 space-y-24">
        {/* STEP 1 */}
        <Section number="01" title="Регистрация на платформе">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={UserPlus} title="Скачайте приложение MUV">
                Установите MUV из{" "}
                <a
                  href="https://apps.apple.com/ru/app/%D0%BC%D1%83%D0%B2/id6746817734"
                  className="text-brand-glow underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  App Store
                </a>{" "}
                или{" "}
                <a
                  href="https://www.rustore.ru/catalog/app/com.muv.fitness"
                  className="text-brand-glow underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  RuStore
                </a>
                .
              </Card>
              <Card icon={Check} title="Создайте аккаунт">
                Введите имя, e-mail и пароль. Подтвердите почту по коду из письма.
              </Card>
              <Card icon={Sparkles} title="Выберите роль «Тренер»">
                На экране выбора роли укажите «Я тренер» — это откроет личный кабинет автора.
              </Card>
              <Card icon={Send} title="Сообщите менеджеру">
                Напишите нам, что вы зарегистрировались — мы активируем расширенные возможности.
              </Card>
            </div>
            <PhoneMock src={screen1} alt="Экран регистрации MUV" />
          </div>
        </Section>

        {/* STEP 2 */}
        <Section number="02" title="Оформление профиля тренера">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <PhoneMock src={screen3} alt="Информация о тренере" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={Camera} title="Фото профиля">
                Качественное портретное фото на нейтральном фоне. Лицо хорошо освещено, в кадре по
                плечи.
              </Card>
              <Card icon={UserPlus} title="Описание о себе">
                Кто вы, какой вид спорта, ключевые достижения и регалии. 3–5 предложений живым
                языком — как будто рассказываете подписчику.
              </Card>
              <Card icon={Instagram} title="Соцсети и контакты">
                Добавьте ссылки на Instagram, Telegram, YouTube — всё, что у вас есть. Это повышает
                доверие и подписки на ваш профиль.
              </Card>
              <Card icon={Youtube} title="Спортивная специализация">
                Укажите направление: лыжи, бокс, бодибилдинг, фитнес, единоборства и т.д. — чтобы
                алгоритм рекомендовал вас целевой аудитории.
              </Card>
            </div>
          </div>
        </Section>

        {/* STEP 3 */}
        <Section number="03" title="Загрузка тренировок">
          <p className="text-lg text-muted-foreground max-w-3xl mb-10 -mt-4">
            Минимум — <span className="text-foreground font-semibold">3 тренировки</span>. Для
            каждой нужно подготовить обложку, название, описание и видео.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            <Card icon={Sparkles} title="Тренировка №1 — ОФП / Разминка">
              Общая физическая подготовка: интересная зарядка, разминка, растяжка. Подходит, если
              ранее вы не записывали обучающее видео.
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-brand-glow">
                <Clock className="w-4 h-4" /> 10–30 минут
              </div>
            </Card>
            <Card icon={Dumbbell} title="Тренировка №2 — Спецблок">
              Упражнения по вашей основной специализации (лыжи, бокс, бодибилдинг и т.д.). Покажите
              экспертизу, за которую вас знают.
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-brand-glow">
                <Clock className="w-4 h-4" /> 10–30 минут
              </div>
            </Card>
            <Card icon={Video} title="Тренировка №3 — Силовой блок">
              Силовая работа в специфичном для вашего вида спорта формате. Можно с инвентарём или с
              собственным весом.
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-brand-glow">
                <Clock className="w-4 h-4" /> 10–30 минут
              </div>
            </Card>
          </div>

          <div className="rounded-2xl bg-brand/10 ring-1 ring-brand/30 p-5 text-[15px] text-foreground/90">
            💡 <span className="font-semibold">Бонус:</span> можно добавить короткие тренировки на{" "}
            <span className="text-brand-glow">5 минут</span> — это отлично заходит аудитории. А если
            у вас уже есть готовые ролики — объедините их в курс и опубликуйте как полноценную
            программу.
          </div>
        </Section>

        {/* STEP 4 — Video Tech Spec */}
        <Section number="04" title="Технические требования к видео">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={RectangleHorizontal} title="Горизонтальная съёмка">
                Все тренировки снимаем <span className="text-foreground font-semibold">горизонтально</span>{" "}
                (16:9). Камеру установить на штатив на уровне пояса/груди.
              </Card>
              <Card icon={Sun} title="Хороший свет">
                Снимайте в хорошо освещённом помещении, желательно в зале. Без контрового света из
                окна за спиной.
              </Card>
              <Card icon={Mic} title="Качественный звук">
                Используйте петличный микрофон или снимайте в тихом помещении. Чётко проговаривайте
                технику упражнений.
              </Card>
              <Card icon={Video} title="Сопровождение голосом">
                Объясняйте, как правильно выполнять каждое упражнение: техника, дыхание, типичные
                ошибки.
              </Card>
            </div>
            <PhoneMock src={screen5} alt="Плеер тренировки в MUV" />
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-glow/10 ring-1 ring-brand/40 p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-brand-foreground shrink-0">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Нет возможности снять в зале?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Мы предоставим зал и поможем со съёмкой. Сообщите об этом{" "}
                  <span className="text-brand-glow font-semibold">заранее</span>, чтобы мы запланировали
                  и забронировали площадку.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* STEP 5 — Card layout */}
        <Section number="05" title="Оформление карточки тренировки">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <PhoneMock src={screen4} alt="Карточка тренировки в MUV" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={Camera} title="Обложка">
                Яркое горизонтальное изображение или кадр из видео. Без мелкого текста — он не
                читается на превью.
              </Card>
              <Card icon={Sparkles} title="Название программы">
                Коротко и понятно: «Утренняя разминка лыжника», «Бокс: работа на скорость», «Силовой
                блок для бодибилдера».
              </Card>
              <Card icon={Send} title="Описание">
                2–4 предложения: для кого тренировка, какой результат, какой инвентарь нужен,
                уровень сложности.
              </Card>
              <Card icon={Video} title="Само видео">
                Загружаете готовый файл по ТЗ из шага 04. Платформа сама конвертирует и оптимизирует
                для зрителей.
              </Card>
            </div>
          </div>
        </Section>

        {/* DOWNLOAD APP */}
        <section className="rounded-3xl bg-gradient-to-br from-brand-deep via-brand to-brand-glow p-1 shadow-[var(--shadow-glow)]" data-pdf-section>
          <div className="rounded-[calc(1.5rem-4px)] bg-background/95 backdrop-blur p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Полезные ссылки</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Скачайте приложение и переходите на сайт MUV, чтобы начать работу.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-brand to-brand-glow text-brand-foreground sm:flex-none"
                  >
                    <a href="https://muv-app.ru/" target="_blank" rel="noreferrer">
                      <Globe className="w-4 h-4 mr-2" /> Сайт muv-app.ru
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-brand/40 sm:flex-none">
                    <a
                      href="https://apps.apple.com/ru/app/%D0%BC%D1%83%D0%B2/id6746817734"
                      target="_blank"
                      rel="noreferrer"
                    >
                      App Store
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-brand/40 sm:flex-none">
                    <a
                      href="https://www.rustore.ru/catalog/app/com.muv.fitness"
                      target="_blank"
                      rel="noreferrer"
                    >
                      RuStore
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-4 flex-wrap">
                <PhoneMock src={screen2} alt="Профиль" rotate="-4deg" />
                <PhoneMock
                  src={screen4}
                  alt="Тренировка"
                  rotate="4deg"
                  imageClassName="w-full h-full object-contain object-center bg-background"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <section data-pdf-section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
            ✅ Финальный чек-лист
          </h2>
          <div className="rounded-2xl bg-surface-elevated/60 ring-1 ring-brand/20 p-6 md:p-8 space-y-3">
            {[
              "Зарегистрировался в MUV как тренер",
              "Загрузил фото профиля и описание о себе",
              "Добавил ссылки на Instagram / Telegram / YouTube",
              "Подготовил 3 тренировки: ОФП, спецблок, силовая",
              "Снял видео горизонтально, со светом и звуком",
              "Загрузил обложку, название и описание для каждой тренировки",
              "Сообщил менеджеру о публикации",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-brand/20 text-brand-glow shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-foreground/90">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-brand/15 bg-surface/50">
        <div className="container max-w-6xl py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-bold text-foreground">MUV</span> — фитнес-платформа нового
            поколения
          </div>
          <div className="flex gap-5">
            <a href="https://muv-app.ru/" target="_blank" rel="noreferrer" className="hover:text-brand-glow">
              muv-app.ru
            </a>
            <a
              href="https://apps.apple.com/ru/app/%D0%BC%D1%83%D0%B2/id6746817734"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-glow"
            >
              App Store
            </a>
            <a
              href="https://www.rustore.ru/catalog/app/com.muv.fitness"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-glow"
            >
              RuStore
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
