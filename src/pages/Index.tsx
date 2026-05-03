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
      <header className="relative overflow-hidden" data-pdf-section>
        <div className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-glow/20 blur-3xl" />

        <div className="relative container max-w-6xl py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 ring-1 ring-brand/30 px-4 py-1.5 text-sm text-brand-glow mb-6">
            <Sparkles className="w-4 h-4" />
            Техническое задание для тренеров
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Стань тренером в <span className="text-brand-glow">МУВ</span> — фитнес-платформе нового поколения
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Простое пошаговое руководство: регистрация, оформление профиля и загрузка тренировок. На всё уйдёт 30–60 минут вашего времени.
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
            <Button asChild variant="outline" size="lg" className="border-brand/40 hover:bg-brand/10">
              <a
                href="https://apps.apple.com/ru/app/%D0%BC%D1%83%D0%B2/id6746817734"
                target="_blank"
                rel="noreferrer"
              >
                App Store
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-brand/40 hover:bg-brand/10">
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

          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-4">
            <PhoneMock src={screen1} alt="Регистрация в MUV" rotate="-6deg" />
            <PhoneMock src={screen2} alt="Профиль тренера" rotate="3deg" />
            <PhoneMock src={screen3} alt="Информация о тренере" rotate="-3deg" />
            <PhoneMock src={screen4} alt="Карточка тренировки" rotate="4deg" />
            <div className="no-print">
              <PhoneMock
                src={screen5}
                alt="Плеер тренировки"
                rotate="-5deg"
                imageClassName="w-full h-full object-contain object-center bg-background"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl py-20 space-y-24">
        <Section number="01" title="Регистрация на платформе">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={UserPlus} title="Скачайте приложение МУВ">
                Установите МУВ из{" "}
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

        <Section number="02" title="Оформление профиля тренера">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <PhoneMock src={screen3} alt="Информация о тренере" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={Camera} title="Фото профиля">
                Качественное портретное фото на нейтральном фоне. Лицо хорошо освещено, в кадре по плечи.
              </Card>
              <Card icon={UserPlus} title="Описание о себе">
                Кто вы, какой вид спорта, ключевые достижения и регалии. 3–5 предложений живым языком — как будто рассказываете подписчику.
              </Card>
              <Card icon={Instagram} title="Соцсети и контакты">
                Добавьте ссылки на Instagram, Telegram, YouTube — всё, что у вас есть. Это повышает доверие и подписки на ваш профиль.
              </Card>
              <Card icon={Youtube} title="Спортивная специализация">
                Укажите направление: лыжи, бокс, бодибилдинг, фитнес, единоборства и т.д. — чтобы алгоритм рекомендовал вас целевой аудитории.
              </Card>
            </div>
          </div>
        </Section>

        <section className="relative" data-pdf-section>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground font-bold text-xl shadow-[var(--shadow-glow)]">
              03
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Загрузка тренировок</h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl mb-10 -mt-4">
            Снимите <span className="text-foreground font-semibold">полноценную реальную тренировку</span>, как вы проводите её в обычной практике. Мы на стороне МУВ сами разберём материал, обрежем лишнее и при необходимости соберём из одного видео несколько отдельных тренировок.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            <Card icon={Clock} title="Реальный формат">
              Тренировка может длиться <span className="text-foreground font-semibold">60, 90 минут или дольше</span>. Не нужно ускоряться или сокращать процесс ради камеры — снимайте в обычном темпе.
            </Card>
            <Card icon={Dumbbell} title="Что можно показывать">
              Одна группа мышц (спина), две (грудь + трицепс), три (ноги + ягодицы + пресс) или полноценная тренировка с разминкой, основной частью и заминкой.
            </Card>
            <Card icon={Mic} title="Живой формат">
              Называйте упражнения, объясняйте технику, проговаривайте паузы и отдых, давайте экспертные подсказки, разбирайте частые ошибки. Будто тренируете человека рядом с собой.
            </Card>
            <Card icon={Sparkles} title="Уровни подготовки">
              Отмечайте, для какого уровня упражнение: <span className="text-foreground font-semibold">новичок</span> — как упростить, <span className="text-foreground font-semibold">средний</span> — базовый вариант, <span className="text-foreground font-semibold">продвинутый</span> — как усложнить и увеличить нагрузку.
            </Card>
            <Card icon={Video} title="Что проговаривать">
              Название упражнения, количество повторений или время, вес и темп, отдых между подходами, ключевые моменты техники, типичные ошибки и какие мышцы работают.
            </Card>
            <Card icon={Check} title="Что не нужно делать">
              Не сокращайте тренировку, не молчите весь ролик, не снимайте только «идеальные» короткие куски и не делите видео на уроки самостоятельно — это сделаем мы.
            </Card>
          </div>
        </section>

        <div
          data-pdf-section
          className="rounded-2xl bg-brand/10 ring-1 ring-brand/30 p-5 text-[15px] text-foreground/90 -mt-16"
        >
          💡 <span className="font-semibold">Пример по уровням:</span> «Новичку — 30 секунд без веса. Среднему — 45 секунд с лёгким весом. Продвинутому — 60–90 секунд с рабочим весом и меньшим отдыхом.» На монтаже мы отдельно выделим рекомендации для каждого уровня.
        </div>

        <section className="relative" data-pdf-section>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground font-bold text-xl shadow-[var(--shadow-glow)]">
              04
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Технические требования к съёмке</h2>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={RectangleHorizontal} title="Горизонтальная съёмка">
                Снимаем только <span className="text-foreground font-semibold">горизонтально</span> (16:9). Камера стоит устойчиво на штативе, в кадре видно всё тело и упражнение не обрезается по рукам, ногам или корпусу.
              </Card>
              <Card icon={Sun} title="Свет и кадр">
                Хорошо освещённое помещение, желательно зал. Без контрового света из окна за спиной. Кадр не слишком близкий — должно быть понятно, как выполняется движение.
              </Card>
              <Card icon={Mic} title="Качественный звук">
                Используйте петличный микрофон или снимайте в тихом помещении. Чётко проговаривайте технику, паузы, отдых и подсказки.
              </Card>
              <Card icon={Video} title="Ракурсы">
                Можно снимать спереди, сбоку, сзади или под углом 45°. Выбирайте ракурс так, чтобы была понятна техника. Для постановки спины или ног — покажите дополнительный ракурс.
              </Card>
            </div>
            <div className="no-print">
              <PhoneMock
                src={screen5}
                alt="Плеер тренировки в МУВ"
                imageClassName="w-full h-full object-contain object-center bg-background"
              />
            </div>
          </div>
        </section>

        <div data-pdf-section className="rounded-2xl bg-gradient-to-br from-brand/20 to-brand-glow/10 ring-1 ring-brand/40 p-6 -mt-16">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-brand-foreground shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Нет возможности снять в зале?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Мы предоставим зал и поможем со съёмкой. Сообщите об этом <span className="text-brand-glow font-semibold">заранее</span>, чтобы мы запланировали и забронировали площадку.
              </p>
            </div>
          </div>
        </div>

        <Section number="05" title="Оформление карточки тренировки">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <PhoneMock src={screen4} alt="Карточка тренировки в МУВ" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={Camera} title="Обложка">
                Яркое горизонтальное изображение или кадр из видео. Без мелкого текста — он не читается на превью.
              </Card>
              <Card icon={Sparkles} title="Название программы">
                Коротко и понятно: «Утренняя разминка лыжника», «Бокс: работа на скорость», «Силовой блок для бодибилдера».
              </Card>
              <Card icon={Send} title="Описание">
                2–4 предложения: для кого тренировка, какой результат, какой инвентарь нужен, уровень сложности.
              </Card>
              <Card icon={Video} title="Само видео">
                Загружаете готовый файл по ТЗ из шага 04. Платформа сама конвертирует и оптимизирует для зрителей.
              </Card>
            </div>
          </div>
        </Section>

        <section
          className="rounded-3xl bg-gradient-to-br from-brand-deep via-brand to-brand-glow p-1 shadow-[var(--shadow-glow)]"
          data-pdf-section
        >
          <div className="rounded-[calc(1.5rem-4px)] bg-background/95 backdrop-blur p-8 md:p-10 xl:p-14">
            <div className="grid gap-10 items-center xl:grid-cols-[minmax(0,1fr)_420px]">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Полезные ссылки</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Скачайте приложение и переходите на сайт МУВ, чтобы начать работу.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-brand to-brand-glow text-brand-foreground"
                  >
                    <a href="https://muv-app.ru/" target="_blank" rel="noreferrer">
                      <Globe className="w-4 h-4 mr-2" /> Сайт muv-app.ru
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-brand/40">
                    <a
                      href="https://apps.apple.com/ru/app/%D0%BC%D1%83%D0%B2/id6746817734"
                      target="_blank"
                      rel="noreferrer"
                    >
                      App Store
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-brand/40">
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
                <PhoneMock src={screen4} alt="Тренировка" rotate="4deg" />
              </div>
            </div>
          </div>
        </section>

        <section data-pdf-section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">✅ Финальный чек-лист</h2>
          <div className="rounded-2xl bg-surface-elevated/60 ring-1 ring-brand/20 p-6 md:p-8 space-y-3">
            {[
              "Зарегистрировался в МУВ как тренер",
              "Загрузил фото профиля и описание о себе",
              "Добавил ссылки на Instagram / Telegram / YouTube",
              "Видео снято горизонтально, хорошо видно упражнение",
              "Звук понятный, тренировка снята в реальном темпе",
              "Есть комментарии и экспертные подсказки",
              "Проговорены уровни подготовки: новичок / средний / продвинутый",
              "Понятны паузы, подходы и логика тренировки",
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

      <footer className="border-t border-brand/15 bg-surface/50">
        <div className="container max-w-6xl py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-bold text-foreground">МУВ</span> — фитнес-платформа нового поколения
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
