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
  Camera,
  Video,
  Dumbbell,
  Sparkles,
  Sun,
  Mic,
  RectangleHorizontal,
  Clock,
  Globe,
  Check,
  X,
  Target,
  ListChecks,
  MessageCircle,
  Layers,
} from "lucide-react";

const Section = ({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section className="relative" data-pdf-section>
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground font-bold text-xl shadow-[var(--shadow-glow)]">
        {number}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-lg text-muted-foreground max-w-3xl mb-8">{subtitle}</p>
    )}
    {children}
  </section>
);

const Card = ({
  icon: Icon,
  title,
  children,
  tone = "default",
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  children: React.ReactNode;
  tone?: "default" | "danger" | "good";
}) => {
  const ringColor =
    tone === "danger"
      ? "ring-destructive/30 hover:ring-destructive/60"
      : tone === "good"
        ? "ring-brand-glow/40 hover:ring-brand-glow/70"
        : "ring-brand/15 hover:ring-brand/40";
  const iconBg =
    tone === "danger"
      ? "bg-destructive/15 text-destructive"
      : "bg-brand/15 text-brand-glow";
  return (
    <div
      className={`rounded-2xl bg-surface-elevated/60 backdrop-blur p-6 ring-1 transition-all ${ringColor}`}
    >
      {(Icon || title) && (
        <div className="flex items-start gap-3 mb-3">
          {Icon && (
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${iconBg}`}
            >
              <Icon className="w-5 h-5" />
            </div>
          )}
          {title && (
            <h3 className="text-lg font-semibold leading-tight pt-1.5">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="text-muted-foreground leading-relaxed text-[15px]">
        {children}
      </div>
    </div>
  );
};

const TableRow = ({
  left,
  right,
  header = false,
}: {
  left: string;
  right: string;
  header?: boolean;
}) => (
  <div
    className={`grid grid-cols-[180px_1fr] md:grid-cols-[240px_1fr] gap-4 px-5 py-4 ${
      header
        ? "bg-brand/15 text-foreground font-semibold"
        : "border-t border-brand/15 text-muted-foreground"
    }`}
  >
    <div className={header ? "" : "text-foreground font-medium"}>{left}</div>
    <div>{right}</div>
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
    <main
      data-pdf-root
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
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
            ТЗ для авторов МУВ
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Как снимать тренировку для{" "}
            <span className="text-brand-glow">МУВ</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Снимайте полноценную реальную тренировку — так, как вы проводите её
            в обычной практике. Команда МУВ сама разберёт материал, обрежет
            лишнее и подготовит к публикации.
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

          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-4">
            <PhoneMock src={screen1} alt="МУВ — экран 1" rotate="-6deg" />
            <PhoneMock src={screen2} alt="МУВ — экран 2" rotate="3deg" />
            <PhoneMock src={screen3} alt="МУВ — экран 3" rotate="-3deg" />
            <PhoneMock src={screen4} alt="МУВ — карточка тренировки" rotate="4deg" />
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
        <Section
          number="01"
          title="Главная задача"
          subtitle="Снимите полноценную реальную тренировку, как вы проводите её в обычной практике. Не нужно подстраиваться под камеру, ускоряться или сокращать процесс — нам важен живой, экспертный и честный формат."
        >
          <div className="grid md:grid-cols-3 gap-5">
            <Card icon={Clock} title="60, 90 минут или дольше">
              Тренировка может идти столько, сколько нужно. Снимайте в обычном
              темпе.
            </Card>
            <Card icon={Layers} title="Мы сами всё разберём">
              Команда МУВ обрежет лишнее, разделит видео на блоки и при
              необходимости соберёт несколько отдельных тренировок из одного
              ролика.
            </Card>
            <Card icon={Target} title="Живой, экспертный формат">
              Без «идеально для камеры». Главное — настоящая тренировка и
              понятная техника.
            </Card>
          </div>
        </Section>

        <Section
          number="02"
          title="Что можно снимать"
          subtitle="В рамках одной съёмки можно показывать тренировку на разные группы мышц. Главное — чтобы тренировка была логичной, понятной и полезной."
        >
          <div className="rounded-2xl overflow-hidden ring-1 ring-brand/20 bg-surface-elevated/40">
            <TableRow left="Формат" right="Пример" header />
            <TableRow left="Одна группа мышц" right="Спина" />
            <TableRow left="Две группы мышц" right="Грудь + трицепс" />
            <TableRow
              left="Три группы мышц"
              right="Ноги + ягодицы + пресс"
            />
            <TableRow
              left="Полноценная тренировка"
              right="Разминка, основная часть, заминка"
            />
          </div>
        </Section>

        <Section
          number="03"
          title="Как вести тренировку в кадре"
          subtitle="Видео должно быть разговорным и живым, а не просто сухим выполнением упражнений. Будто вы тренируете человека рядом с собой и параллельно объясняете, что и зачем делаете."
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={MessageCircle} title="Приветствуется">
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>называть упражнения;</li>
                  <li>объяснять технику;</li>
                  <li>проговаривать паузы и отдых;</li>
                  <li>давать экспертные подсказки;</li>
                </ul>
              </Card>
              <Card icon={Sparkles} title="И ещё">
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>объяснять частые ошибки;</li>
                  <li>говорить, какие мышцы работают;</li>
                  <li>добавлять неформальные комментарии и лёгкие шутки;</li>
                  <li>объяснять, кому подходит упражнение.</li>
                </ul>
              </Card>
            </div>
            <PhoneMock src={screen3} alt="Информация о тренере" />
          </div>
        </Section>

        <Section
          number="04"
          title="Уровни подготовки"
          subtitle="По возможности отмечайте, для какого уровня подходит упражнение. На монтаже мы отдельно выделим рекомендации для каждого уровня."
        >
          <div className="rounded-2xl overflow-hidden ring-1 ring-brand/20 bg-surface-elevated/40">
            <TableRow left="Уровень" right="Что нужно объяснить" header />
            <TableRow
              left="Новичок"
              right="Как упростить упражнение, какой вес/время/темп выбрать"
            />
            <TableRow
              left="Средний уровень"
              right="Базовый рабочий вариант"
            />
            <TableRow
              left="Продвинутый"
              right="Как усложнить упражнение, увеличить нагрузку или интенсивность"
            />
          </div>

          <div
            data-pdf-section
            className="rounded-2xl bg-brand/10 ring-1 ring-brand/30 p-5 text-[15px] text-foreground/90 mt-6"
          >
            💡 <span className="font-semibold">Пример:</span> «Новичку — 30
            секунд без веса. Среднему — 45 секунд с лёгким весом. Продвинутому
            — 60–90 секунд с рабочим весом и меньшим отдыхом.»
          </div>
        </Section>

        <Section
          number="05"
          title="Технические требования к съёмке"
          subtitle="Съёмка должна быть горизонтальной. Камера стоит устойчиво, в кадре видно всё тело и упражнение не обрезается."
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={RectangleHorizontal} title="Горизонтальный формат">
                Снимайте только горизонтально (16:9). Камера на штативе,
                устойчиво. В кадре видно всё тело — упражнение не обрезается по
                рукам, ногам или корпусу.
              </Card>
              <Card icon={Sun} title="Свет и кадр">
                Хорошо освещённое помещение, желательно зал. Без контрового
                света из окна за спиной. Кадр не слишком близкий — должно быть
                понятно, как выполняется движение.
              </Card>
              <Card icon={Mic} title="Звук">
                Используйте петличный микрофон или снимайте в тихом помещении.
                Чётко проговаривайте технику, паузы, отдых и подсказки.
              </Card>
              <Card icon={Video} title="Ракурсы">
                Можно снимать спереди, сбоку, сзади или под углом 45°.
                Выбирайте ракурс так, чтобы была понятна техника. Для
                постановки спины или ног — покажите дополнительный ракурс.
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

          <div
            data-pdf-section
            className="rounded-2xl bg-gradient-to-br from-brand/20 to-brand-glow/10 ring-1 ring-brand/40 p-6 mt-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-brand-foreground shrink-0">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Нет возможности снять в зале?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Мы предоставим зал и поможем со съёмкой. Сообщите об этом{" "}
                  <span className="text-brand-glow font-semibold">
                    заранее
                  </span>
                  , чтобы мы запланировали и забронировали площадку.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          number="06"
          title="Что важно проговаривать"
          subtitle="Во время тренировки желательно комментировать ключевые моменты — это поможет пользователю лучше понять упражнение."
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Название упражнения.",
              "Количество повторений или время выполнения.",
              "Вес, темп или уровень нагрузки.",
              "Сколько отдыхать между подходами.",
              "На что обратить внимание в технике.",
              "Для какого уровня подходит упражнение.",
              "Как упростить или усложнить движение.",
              "Какие ошибки чаще всего делают люди.",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-surface-elevated/60 ring-1 ring-brand/15 p-4"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand/15 text-brand-glow shrink-0 text-sm font-semibold">
                  {i + 1}
                </div>
                <p className="text-foreground/90 text-[15px] pt-0.5">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          number="07"
          title="Что не нужно делать"
          subtitle="Ваша задача — снять качественный исходный материал. Наша задача — упаковать его в формат приложения МУВ."
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Специально сокращать тренировку",
              "Делать всё слишком быстро",
              "Молчать весь ролик",
              "Снимать только «идеальные» короткие куски",
              "Переживать, что видео получилось длинным",
              "Самостоятельно делить видео на уроки и блоки",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-destructive/5 ring-1 ring-destructive/25 p-4"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-destructive/15 text-destructive shrink-0">
                  <X className="w-4 h-4" />
                </div>
                <p className="text-foreground/90 text-[15px] pt-0.5">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <section data-pdf-section>
          <div className="flex items-center gap-3 mb-6">
            <ListChecks className="w-8 h-8 text-brand-glow" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Чек-лист перед отправкой
            </h2>
          </div>
          <div className="rounded-2xl bg-surface-elevated/60 ring-1 ring-brand/20 p-6 md:p-8 space-y-3">
            {[
              "Видео снято горизонтально",
              "Хорошо видно упражнение",
              "Звук достаточно понятный",
              "Тренировка снята в реальном темпе",
              "Есть комментарии и экспертные подсказки",
              "Проговорены уровни подготовки: новичок / средний / продвинутый",
              "Понятны паузы, подходы и логика тренировки",
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

        <section
          className="rounded-3xl bg-gradient-to-br from-brand-deep via-brand to-brand-glow p-1 shadow-[var(--shadow-glow)]"
          data-pdf-section
        >
          <div className="rounded-[calc(1.5rem-4px)] bg-background/95 backdrop-blur p-8 md:p-10 xl:p-14">
            <div className="grid gap-10 items-center xl:grid-cols-[minmax(0,1fr)_420px]">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Снимайте так, как тренируете в жизни
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  МУВ не требует студийной постановки или искусственного
                  формата. Нам важна настоящая тренировка, экспертные
                  комментарии, понятная техника и живое общение с
                  пользователем.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-brand to-brand-glow text-brand-foreground"
                  >
                    <a
                      href="https://muv-app.ru/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" /> muv-app.ru
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-brand/40"
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
                    size="lg"
                    variant="outline"
                    className="border-brand/40"
                  >
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
      </div>

      <footer className="border-t border-brand/15 bg-surface/50">
        <div className="container max-w-6xl py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-bold text-foreground">МУВ</span> —
            фитнес-платформа нового поколения
          </div>
          <div className="flex gap-5">
            <a
              href="https://muv-app.ru/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-glow"
            >
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
