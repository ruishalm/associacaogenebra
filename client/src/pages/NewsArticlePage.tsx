import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section/Section';
import styles from './NewsArticlePage.module.css';

const articleContent: Record<string, { title: string; description: string; body: string[] }> = {
  'resumo-reuniao': {
    title: 'Resumo da Reunião da Associação',
    description: 'Resumo das decisões da última reunião da associação com a comunidade.',
    body: [
      'Na última reunião, a associação reforçou o compromisso com a participação comunitária e a defesa de melhorias no bairro.',
      'Entre os temas debatidos, ficaram a mobilização por infraestrutura, segurança, saúde e ações voltadas ao bem-estar dos moradores.',
      'Também foi reforçada a necessidade de fortalecer a presença da associação junto ao poder público e manter o diálogo com a comunidade.',
    ],
  },
  'reuniao-seguranca': {
    title: 'Segurança, Sossego e Ações no Genebra',
    description: 'Resumo da reunião do CONSEG e das demandas da comunidade por mais segurança e fiscalização.',
    body: [
      'No dia 7 de julho, tivemos uma importante reunião do CONSEG no nosso bairro. Contamos com cerca de 40 moradores e representantes da segurança, fiscalização e Conselho Tutelar.',
      'O assunto mais cobrado por todos foi a perturbação do sossego. Vários moradores apresentaram Boletins de Ocorrência e exigiram fiscalização.',
      'Também debatemos o medo gerado pela falta de iluminação pública nas nossas ruas e a necessidade de projetos sociais voltados para os adolescentes.',
      'Foram duas horas de muito debate e união da comunidade. A participação de cada um é fundamental, porque juntos somos mais fortes!',
    ],
  },
  'abaixo-assinado': {
    title: 'Abaixo-Assinado por um Centro Cultural e Esportivo',
    description: 'A associação e os moradores reivindicam um espaço de lazer e cultura para o bairro.',
    body: [
      'Vários moradores têm procurado as associações para falar sobre a falta de locais de lazer no Genebra. Apesar de sermos um bairro muito populoso, não contamos com nenhuma praça pública.',
      'As opções mais próximas ficam a 30 ou 40 minutos de distância, em Brigadeiro Tobias ou em Alumínio. Hoje, o que nos resta são ações voluntárias e pessoais, como as festas de Dia das Crianças e de Natal.',
      'Por isso, as duas associações do bairro estão se unindo para lançar um abaixo-assinado. Queremos que todos compreendam a importância dessa luta e participem dessa solicitação oficial para exigir um local estruturado.',
      'Essa conquista vai transformar o nosso bairro, garantindo principalmente que os nossos jovens tenham um espaço seguro para aprender, se exercitar e se divertir. Assine, apoie e participe ativamente, porque juntos somos mais fortes!',
    ],
  },
  'legado-genebra': {
    title: 'Memória e Continuidade: O Legado no Genebra',
    description: 'Uma reflexão sobre a memória do bairro e o que segue em frente.',
    body: [
      'Este espaço reúne memórias relevantes do bairro e reforça a continuidade das ações da associação em favor da comunidade.',
      'A ideia é preservar a história local e conectar a tradição aos projetos que ainda estão por vir.',
      'O bairro Genebra carrega marcas históricas e culturais que precisam ser lembradas, valorizadas e transmitidas às futuras gerações.',
    ],
  },
  'castracao-gratuita': {
    title: 'Campanha de Castração Gratuita',
    description: 'Informações sobre as últimas vagas, a logística e a importância da campanha para o bairro.',
    body: [
      'A campanha de castração gratuita segue com vagas limitadas e cadastro presencial obrigatório para tutores de cães e gatos.',
      'A ação é uma parceria com a comunidade e com autoridades locais, com o objetivo de promover saúde, controle populacional e bem-estar animal.',
      'As informações sobre data, horário e local são divulgadas pela associação para que todos tenham acesso.',
    ],
  },
  'pedagio-free-flow': {
    title: 'Os Impactos do Pedágio Free Flow no Genebra',
    description: 'Um alerta sobre o impacto do pedágio e as preocupações da comunidade.',
    body: [
      'A instalação do pedágio Free Flow no trecho da Raposo Tavares é tema de preocupação para a comunidade do Genebra.',
      'A associação acompanha de perto o assunto e reforça que o aumento do tráfego pode trazer riscos à segurança e ao cotidiano dos moradores.',
      'A mobilização da comunidade é essencial para que as demandas sejam ouvidas com seriedade.',
    ],
  },
  'desafio-estradas': {
    title: 'O Desafio das Nossas Estradas',
    description: 'A infraestrutura local segue sendo um dos principais temas de luta da associação.',
    body: [
      'As condições das estradas do bairro continuam sendo um dos maiores desafios enfrentados pelos moradores.',
      'A ausência de melhorias compromete a mobilidade, a segurança e o acesso aos serviços essenciais.',
      'Por isso, a associação segue cobrando ações concretas e acompanhamento do poder público.',
    ],
  },
  'cultura-esporte': {
    title: 'A Luta por Cultura e Esporte no Genebra',
    description: 'A defesa de espaços e oportunidades para crianças, jovens e idosos.',
    body: [
      'O bairro Genebra possui uma população jovem e diversa, e por isso a luta por cultura e esporte é uma prioridade.',
      'A associação defende a criação e a valorização de espaços para atividades comunitárias, lazer e formação.',
      'Essas ações ajudam a fortalecer os vínculos, ampliar oportunidades e cuidar da vida social do bairro.',
    ],
  },
};

const NewsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articleContent[slug] : undefined;

  if (!article) {
    return (
      <Section title="Notícia não encontrada" subtitle="A notícia solicitada não está disponível no momento.">
        <Link to="/noticias" className={styles.backLink}>Voltar para notícias</Link>
      </Section>
    );
  }

  return (
    <Section title={article.title} subtitle={article.description}>
      <div className={styles.content}>
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link to="/noticias" className={styles.backLink}>Voltar para notícias</Link>
      </div>
    </Section>
  );
};

export default NewsArticlePage;
