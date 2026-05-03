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
  Video,
  Dumbbell,
  Sparkles,
  Sun,
  Mic,
  RectangleHorizontal,
  Clock,
  Globe,
  Check,
  Camera,
  MessageCircle,
  Users,
  Target,
  Zap,
  Layers,
  X,
  ListChecks,
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
      await exportPdf("[data-pdf-root]", "MUV-author-brief.pdf");
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
            Техническое задание для авторов
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Как снимать тренировку для <span className="text-brand-glow">МУВ</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Снимайте тренировку так, как вы проводите её в реальной жизни. Команда МУВ сама разберёт
            материал, обрежет лишнее и подготовит к публикации в приложении.
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
            <PhoneMock src={screen1} alt="МУВ — экран тренировки" rotate="-6deg" />
            <PhoneMock src={screen2} alt="МУВ — профиль автора" rotate="3deg" />
            <PhoneMock src={screen3} alt="МУВ — карточка тренировки" rotate="-3deg" />
            <PhoneMock src={screen4} alt="МУВ — плеер" rotate="4deg" />
            <div className="no-print">
              <PhoneMock
                src={screen5}
                alt="МУВ — видео тренировки"
                rotate="-5deg"
                imageClassName="w-full h-full object-contain object-center bg-background"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl py-20 space-y-24">
        <Section number="01" title="Главная задача">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card icon={Video} title="Реальная тренировка">
              Снимите полноценную тренировку так, как вы обычно её проводите. Не нужно подстраиваться
              под камеру, ускоряться или делать всё «идеально».
            </Card>
            <Card icon={Clock} title="Любая длительность">
              Тренировка может длиться 60, 90 минут или дольше. Не переживайте, что видео получилось
              длинным — это нормально и ожидаемо.
            </Card>
            <Card icon={Layers} title="МУВ делает монтаж">
              Наша команда самостоятельно разберёт материал, обрежет лишнее, разделит тренировку на
              блоки и при необходимости соберёт из одного видео несколько отдельных тренировок.
            </Card>
            <Card icon={Sparkles} title="Живой экспертный формат">
              Нам важен настоящий, честный и профессиональный контент — как будто вы тренируете
              человека рядом с собой и параллельно объясняете, что и зачем делаете.
            </Card>
          </div>
        </Section>

        <Section number="02" title="Что можно снимать">
          <p className="text-lg text-muted-foreground max-w-3xl mb-8 -mt-4">
            В рамках одной съёмки можно показывать тренировку на разные группы мышц.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card icon={Target} title="Одна группа мышц">
              Например:{" "}
              <span className="text-foreground font-semibold">Спина</span>
            </Card>
            <Card icon={Dumbbell} title="Две группы мышц">
              Например:{" "}
              <span className="text-foreground font-semibold">Грудь + трицепс</span>
            </Card>
            <Card icon={Zap} title="Три группы мышц">
              Например:{" "}
              <span className="text-foreground font-semibold">Ноги + ягодицы + пресс</span>
            </Card>
            <Card icon={Video} title="Полная тренировка">
              Разминка, основная часть, заминка — всё{" "}
              <span className="text-foreground font-semibold">в одном видео</span>.
            </Card>
          </div>
          <div className="mt-4 rounded-2xl bg-brand/10 ring-1 ring-brand/30 p-5 text-[15px] text-foreground/90">
            💡 Главное — чтобы тренировка была{" "}
            <span className="font-semibold">логичной, понятной и полезной</span> для пользователя.
          </div>
        </Section>

        <Section number="03" title="Как вести тренировку в кадре">
          <p className="text-lg text-muted-foreground max-w-3xl mb-8 -mt-4">
            Видео должно быть{" "}
            <span className="text-foreground font-semibold">разговорным и живым</span> — не просто
            сухое выполнение упражнений.
          </p>
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={MessageCircle} title="Называйте и объясняйте">
                Называйте упражнения, объясняйте технику выполнения, проговаривайте, какие мышцы
                работают.
              </Card>
              <Card icon={Clock} title="Комментируйте паузы">
                Проговаривайте паузы и отдых — сколько секунд, что делать между подходами.
              </Card>
              <Card icon={Sparkles} title="Давайте экспертные подсказки">
                Объясняйте частые ошибки, давайте советы по технике, добавляйте неформальные
                комментарии и лёгкие шутки.
              </Card>
              <Card icon={Users} title="Объясняйте, кому подходит">
                Говорите, для какого уровня подготовки подходит упражнение и кому оно будет особенно
                полезно.
              </Card>
            </div>
            <PhoneMock src={screen3} alt="МУВ — карточка тренировки" />
          </div>
        </Section>

        <Section number="04" title="Уровни подготовки">
          <p className="text-lg text-muted-foreground max-w-3xl mb-8 -mt-4">
            По возможности отмечайте, для какого уровня подходит упражнение. Если нагрузка
            отличается — обязательно проговорите это в кадре.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <Card icon={Target} title="Новичок">
              Объясните,{" "}
              <span className="text-foreground font-semibold">как упростить</span> упражнение: какой
              вес, время и темп выбрать для начинающих.
              <div className="mt-3 text-sm text-brand-glow italic">«Новичку — 30 сек без веса»</div>
            </Card>
            <Card icon={Dumbbell} title="Средний уровень">
              Покажите{" "}
              <span className="text-foreground font-semibold">базовый рабочий вариант</span> —
              стандартный режим для большинства занимающихся.
              <div className="mt-3 text-sm text-brand-glow italic">«45 сек с лёгким весом»</div>
            </Card>
            <Card icon={Zap} title="Продвинутый">
              Объясните,{" "}
              <span className="text-foreground font-semibold">как усложнить</span>: увеличить
              нагрузку, интенсивность или сократить отдых.
              <div className="mt-3 text-sm text-brand-glow italic">«60–90 сек с рабочим весом»</div>
            </Card>
          </div>
          <div className="mt-4 rounded-2xl bg-brand/10 ring-1 ring-brand/30 p-5 text-[15px] text-foreground/90">
            💬 На монтаже МУВ отдельно выделит рекомендации для каждого уровня — это помогает
            аудитории выбрать подходящую нагрузку.
          </div>
        </Section>

        <Section number="05" title="Технические требования к съёмке">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card icon={RectangleHorizontal} title="Горизонтальная съёмка">
                Все тренировки снимаем{" "}
                <span className="text-foreground font-semibold">горизонтально</span>. Камера стоит
                устойчиво, видно всё тело, упражнение не обрезается по рукам, ногам или корпусу.
              </Card>
              <Card icon={Sun} title="Понятный ракурс">
                Снимайте спереди, сбоку, сзади или под углом 45°. Выбирайте ракурс так, чтобы была{" "}
                <span className="text-foreground font-semibold">понятна техника</span> упражнения.
              </Card>
              <Card icon={Mic} title="Голосовые пояснения">
                Используйте петличный микрофон или снимайте в тихом помещении. Чётко проговаривайте
                технику, вес, темп и количество повторений.
              </Card>
              <Card icon={Camera} title="Что комментировать">
                Название упражнения, повторения/время, нагрузку, отдых, технику, типичные ошибки и
                рекомендации по уровням подготовки.
              </Card>
            </div>
            <div className="no-print">
              <PhoneMock
                src={screen5}
                alt="МУВ — плеер тренировки"
                imageClassName="w-full h-full object-contain object-center bg-background"
              />
            </div>
          </div>
        </Section>

        <div
          data-pdf-section
          className="rounded-2xl bg-gradient-to-br from-brand-deep via-brand/50 to-surface-elevated ring-1 ring-brand/40 p-6 md:p-8 -mt-16"
        >
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-brand-foreground shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">Что не нужно делать</h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-4">
                {[
                  "Специально сокращать тренировку",
                  "Делать всё слишком быстро",
                  "Молчать весь ролик",
                  "Снимать только «идеальные» короткие куски",
                  "Переживать, что видео получилось длинным",
                  "Самостоятельно делить видео на блоки и уроки",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                    <span className="text-brand-glow mt-0.5 shrink-0 font-bold">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-[15px]">
                Ваша задача — снять{" "}
                <span className="text-foreground font-semibold">качественный исходный материал</span>
                . Наша задача — аккуратно упаковать его в формат приложения МУВ.
              </p>
            </div>
          </div>
        </div>

        <section data-pdf-section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
            ✅ Чек-лист перед отправкой
          </h2>
          <div className="rounded-2xl bg-surface-elevated/60 ring-1 ring-brand/20 p-6 md:p-8 space-y-3">
            {[
              "Видео снято горизонтально",
              "Хорошо видно упражнение — не обрезается по рукам, ногам или корпусу",
              "Звук достаточно понятный",
              "Тренировка снята в реальном темпе",
              "Есть комментарии и экспертные подсказки",
              "Проговорены уровни подготовки: новичок / средний / продвинутый",
              "Понятны паузы, подходы и общая логика тренировки",
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
                  Скачайте приложение МУВ и переходите на сайт, чтобы начать работу.
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
                <PhoneMock src={screen2} alt="МУВ — профиль" rotate="-4deg" />
                <PhoneMock src={screen4} alt="МУВ — тренировка" rotate="4deg" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-brand/15 bg-surface/50">
        <div className="container max-w-6xl py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-bold text-foreground">МУВ</span> — фитнес-платформа нового
            поколения
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
