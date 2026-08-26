import { DailyReflection, DayOfWeekName, DevotionalCategory, NatureCategory } from "../types";
import { NATURE_IMAGE_GALLERY } from "./natureImages";

type PassageSeed = {
  title: string;
  verseText: string;
  verseReference: string;
  truth: string;
  prayerFocus: string;
  image: NatureCategory;
};

type DailyLens = {
  category: DevotionalCategory;
  title: string;
  invitation: string;
  action: string;
};

const DAY_NAMES: DayOfWeekName[] = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado",
];

const PASSAGES: PassageSeed[] = [
  { title: "Cuidado que não falta", verseText: "O Senhor é o meu pastor; nada me faltará.", verseReference: "Salmos 23:1", truth: "Você não atravessa este dia sem cuidado: Deus conhece suas necessidades e conduz cada passo.", prayerFocus: "ensina-me a descansar no Teu cuidado", image: "lago" },
  { title: "Coragem para caminhar", verseText: "Sê forte e corajoso; o Senhor é contigo.", verseReference: "Josué 1:9", truth: "A coragem não é ausência de medo, mas a decisão de avançar consciente da presença de Deus.", prayerFocus: "firma meus passos e renova minha coragem", image: "montanhas" },
  { title: "Direção para escolher", verseText: "Confia no Senhor de todo o teu coração.", verseReference: "Provérbios 3:5", truth: "Nem toda resposta precisa nascer da pressa; há direção quando o coração reconhece Deus no caminho.", prayerFocus: "concede-me discernimento e serenidade", image: "floresta" },
  { title: "Paz para o coração", verseText: "Deixo-vos a paz, a minha paz vos dou.", verseReference: "João 14:27", truth: "A paz de Cristo não depende de um dia perfeito; ela pode guardar você em meio ao que ainda está sendo resolvido.", prayerFocus: "silencia em mim aquilo que rouba a paz", image: "porsol" },
  { title: "Forças renovadas", verseText: "Os que esperam no Senhor renovam as suas forças.", verseReference: "Isaías 40:31", truth: "Esperar em Deus também é movimento interior: é trocar o desespero pela confiança no tempo certo.", prayerFocus: "renova minhas forças e minha esperança", image: "cachoeira" },
  { title: "Abrigo seguro", verseText: "Aquele que habita no esconderijo do Altíssimo descansará.", verseReference: "Salmos 91:1", truth: "Existe um lugar de descanso na presença de Deus onde a alma se lembra de que não precisa controlar tudo.", prayerFocus: "guarda meu lar e aquieta minha mente", image: "ceu" },
  { title: "Amor que permanece", verseText: "O maior destes é o amor.", verseReference: "1 Coríntios 13:13", truth: "O amor se torna visível nos gestos pequenos, nas palavras cuidadosas e na disposição de recomeçar.", prayerFocus: "faz de mim instrumento do Teu amor", image: "flores" },
  { title: "Socorro presente", verseText: "Deus é o nosso refúgio e fortaleza.", verseReference: "Salmos 46:1", truth: "Deus não observa sua luta de longe; Ele se faz presente justamente onde suas forças parecem menores.", prayerFocus: "sê meu refúgio nesta necessidade", image: "montanhas" },
  { title: "Propósito em formação", verseText: "Todas as coisas cooperam para o bem daqueles que amam a Deus.", verseReference: "Romanos 8:28", truth: "Nem tudo é bom, mas Deus pode trabalhar até nas partes difíceis e transformá-las em amadurecimento.", prayerFocus: "ajuda-me a confiar no propósito que ainda não vejo", image: "campo" },
  { title: "Descanso para a alma", verseText: "Vinde a mim, e eu vos aliviarei.", verseReference: "Mateus 11:28", truth: "Jesus não exige que você esconda o cansaço; Ele convida você a entregar o peso e receber alívio.", prayerFocus: "recebe meu cansaço e dá-me descanso", image: "lago" },
  { title: "Luz no caminho", verseText: "Lâmpada para os meus pés é a tua palavra.", verseReference: "Salmos 119:105", truth: "Talvez você não enxergue a estrada inteira, mas a Palavra oferece luz suficiente para o próximo passo.", prayerFocus: "ilumina a decisão que está diante de mim", image: "floresta" },
  { title: "Alegria renovada", verseText: "A alegria do Senhor é a vossa força.", verseReference: "Neemias 8:10", truth: "A alegria que nasce em Deus não ignora a dor; ela devolve fôlego para continuar apesar dela.", prayerFocus: "devolve leveza e esperança ao meu coração", image: "flores" },
  { title: "Cuidado com a ansiedade", verseText: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", verseReference: "1 Pedro 5:7", truth: "Entregar a ansiedade é um exercício repetido: toda vez que o pensamento voltar, você pode colocá-lo novamente nas mãos de Deus.", prayerFocus: "acolhe minhas preocupações e ensina-me a confiar", image: "ceu" },
  { title: "Novo a cada manhã", verseText: "As misericórdias do Senhor renovam-se cada manhã.", verseReference: "Lamentações 3:22-23", truth: "O amanhecer anuncia que a graça não ficou presa ao ontem; hoje existe misericórdia nova para você.", prayerFocus: "ajuda-me a receber este novo começo", image: "campo" },
  { title: "Caminho de esperança", verseText: "Eu é que sei que pensamentos tenho a vosso respeito.", verseReference: "Jeremias 29:11", truth: "Mesmo quando os planos mudam, o coração de Deus continua inclinado para conduzir você com esperança.", prayerFocus: "alinha meus planos aos Teus e guarda meu futuro", image: "porsol" },
  { title: "Presença na travessia", verseText: "Quando passares pelas águas, eu serei contigo.", verseReference: "Isaías 43:2", truth: "A promessa não é ausência de travessias, mas companhia fiel enquanto você passa por elas.", prayerFocus: "permanece comigo nesta travessia", image: "cachoeira" },
  { title: "Graça suficiente", verseText: "A minha graça te basta.", verseReference: "2 Coríntios 12:9", truth: "Sua limitação não impede a ação de Deus; muitas vezes é nela que a graça se torna mais perceptível.", prayerFocus: "sustenta-me com Tua graça hoje", image: "montanhas" },
  { title: "Coração agradecido", verseText: "Em tudo, dai graças.", verseReference: "1 Tessalonicenses 5:18", truth: "Gratidão não chama a dor de boa; ela reconhece que, mesmo em dias difíceis, a bondade de Deus ainda deixa sinais.", prayerFocus: "abre meus olhos para as bênçãos discretas", image: "flores" },
  { title: "Sono em paz", verseText: "Em paz me deito e logo pego no sono.", verseReference: "Salmos 4:8", truth: "A noite não precisa ser lugar de cobranças. Você pode encerrar o dia confiando que Deus permanece acordado e cuidando de tudo.", prayerFocus: "aquieta meus pensamentos e concede-me sono reparador", image: "ceu" },
  { title: "Família nas mãos de Deus", verseText: "Eu e a minha casa serviremos ao Senhor.", verseReference: "Josué 24:15", truth: "Um lar é fortalecido por escolhas diárias de respeito, oração, perdão e presença verdadeira.", prayerFocus: "abençoa minha casa e ensina-nos a amar melhor", image: "campo" },
];

const LENSES: DailyLens[] = [
  { category: "Paz", title: "Respire e confie", invitation: "Hoje, diminua o ruído por alguns minutos e permita que esta verdade organize seus pensamentos.", action: "Faça três respirações lentas e entregue a Deus, pelo nome, uma preocupação." },
  { category: "Coragem", title: "Um passo de cada vez", invitation: "Você não precisa resolver tudo de uma vez; fidelidade também se constrói em pequenos passos.", action: "Escolha uma tarefa que vinha adiando e dedique a ela quinze minutos com oração." },
  { category: "Gratidão", title: "Perceba o que floresceu", invitation: "Há sinais de cuidado que a pressa costuma esconder. Hoje, olhe novamente para o caminho percorrido.", action: "Anote uma bênção recente e agradeça a alguém que participou dela." },
  { category: "Recomeço", title: "A graça abre caminhos", invitation: "O que não saiu como você esperava não precisa definir o restante da sua história.", action: "Recomece hoje uma atitude boa em sua versão mais simples e possível." },
  { category: "Esperança", title: "Ainda há futuro", invitation: "A esperança cristã não é negação da realidade; é confiança de que Deus continua trabalhando nela.", action: "Escreva uma frase de esperança e deixe-a em um lugar que você verá amanhã." },
  { category: "Família", title: "Amor dentro de casa", invitation: "A espiritualidade também aparece no tom de voz, na escuta e no cuidado com quem convive conosco.", action: "Faça um gesto de cuidado por alguém da sua família sem esperar reconhecimento." },
  { category: "Para dormir", title: "Entregue a noite", invitation: "O dia terminou. O que ficou incompleto pode descansar nas mãos de Deus até o novo amanhecer.", action: "Afaste a tela por dez minutos, faça uma oração curta e relaxe conscientemente o corpo." },
  { category: "Paz", title: "Silêncio que acolhe", invitation: "Nem todo silêncio é vazio; alguns são espaços onde o coração volta a perceber a presença de Deus.", action: "Permaneça dois minutos em silêncio e repita: ‘Tua paz guarda meu coração’." },
  { category: "Coragem", title: "Fé diante do medo", invitation: "O medo pode falar, mas não precisa decidir. Deus pode conduzir você mesmo com as mãos trêmulas.", action: "Dê hoje um passo pequeno e seguro em direção ao que você sabe que precisa enfrentar." },
  { category: "Gratidão", title: "Memória da bondade", invitation: "Lembrar o que Deus já fez fortalece o coração para aquilo que ainda está em processo.", action: "Recorde uma resposta de oração e registre em uma frase o que ela lhe ensinou." },
  { category: "Recomeço", title: "Sem carregar o ontem", invitation: "Arrependimento saudável aponta para transformação, não para uma condenação sem fim.", action: "Perdoe-se por uma falha, reconheça o aprendizado e escolha uma resposta diferente hoje." },
  { category: "Esperança", title: "Sementes invisíveis", invitation: "Nem todo crescimento aparece imediatamente. Algumas raízes estão se firmando antes de qualquer flor.", action: "Cuide hoje de uma meta futura com uma ação de menos de vinte minutos." },
  { category: "Família", title: "Palavras que edificam", invitation: "Uma palavra sincera de reconhecimento pode mudar o clima de uma casa e curar distâncias.", action: "Diga a alguém próximo uma qualidade que você verdadeiramente admira nessa pessoa." },
  { category: "Para dormir", title: "Deus cuida enquanto você dorme", invitation: "Descansar também é um ato de fé: você admite que o mundo não depende apenas do seu esforço.", action: "Liste mentalmente três motivos de gratidão e deixe para amanhã o que não pode resolver agora." },
  { category: "Paz", title: "Coração desacelerado", invitation: "A pressa exterior não precisa se transformar em confusão interior quando sua atenção volta para Deus.", action: "Faça sua próxima atividade sem realizar outra ao mesmo tempo; esteja inteiramente presente." },
  { category: "Coragem", title: "Fortaleza com mansidão", invitation: "Ser forte não significa endurecer. A coragem de Cristo consegue unir firmeza, verdade e mansidão.", action: "Estabeleça hoje um limite necessário usando palavras respeitosas e claras." },
  { category: "Gratidão", title: "O comum também é milagre", invitation: "O alimento, a água, o abrigo e uma conversa amiga podem revelar uma bondade que se repete todos os dias.", action: "Durante uma refeição, faça uma pausa e agradeça especificamente pelo que está à mesa." },
  { category: "Recomeço", title: "Uma página nova", invitation: "Deus não desperdiça capítulos difíceis; Ele pode transformá-los em sabedoria para a próxima página.", action: "Organize um pequeno espaço ao seu redor como símbolo do novo que deseja cultivar." },
  { category: "Para dormir", title: "Noite de proteção", invitation: "Você pode fechar os olhos sem fechar o coração para a confiança: a presença de Deus envolve sua casa.", action: "Ore por cada pessoa do seu lar e encerre o dia sem consultar novamente as preocupações." },
];

function dateForDay(day: number) {
  const date = new Date(2025, 0, day);
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const ANNUAL_DEVOTIONALS: DailyReflection[] = Array.from({ length: 365 }, (_, index) => {
  const day = index + 1;
  const passage = PASSAGES[index % PASSAGES.length];
  const lens = LENSES[Math.floor(index / PASSAGES.length) % LENSES.length];
  const calendarDate = new Date(2025, 0, day);
  const imageOptions = NATURE_IMAGE_GALLERY.filter((image) => image.category === passage.image);
  const image = imageOptions[Math.floor(index / PASSAGES.length) % imageOptions.length] || NATURE_IMAGE_GALLERY[0];

  return {
    id: `dev-${String(day).padStart(3, "0")}`,
    dateKey: dateForDay(day),
    dayOfYear: day,
    dayOfWeekCode: calendarDate.getDay(),
    dayOfWeekName: DAY_NAMES[calendarDate.getDay()],
    category: lens.category,
    title: `${lens.title}: ${passage.title}`,
    theme: lens.category,
    verseText: passage.verseText,
    verseReference: `${passage.verseReference} (ARA)`,
    reflectionText: `${passage.truth} ${lens.invitation} Esta é a palavra preparada para o ${day}º dia da sua caminhada anual.`,
    prayer: `Senhor, ${passage.prayerFocus}. Conduze meu coração nesta palavra e ajuda-me a vivê-la com sinceridade. Amém.`,
    practicalAction: `${lens.action} Ao concluir, marque esta atitude como realizada no seu ${day}º dia.`,
    bgCategory: passage.image,
    bgImageUrl: image.url,
    bgLocation: image.location,
    tags: [lens.category, passage.title, "Devocional anual"],
  };
});

export const getTodayDevotional = (date = new Date()) => {
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return ANNUAL_DEVOTIONALS.find((item) => item.dateKey === key) || ANNUAL_DEVOTIONALS[0];
};
