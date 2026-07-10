import NewsCard from '../components/NewsCard/NewsCard';
import Section from '../components/Section/Section';
import styles from './NewsPage.module.css';

import logoImage from '../assets/img/cards/LOGOTIPO.png';
import castracaoImage from '../assets/img/cards/castracao.png';
import caldoImage from '../assets/img/legacy/caldo.jpg';
import abaixoAssinadoImage from '../assets/img/news/abaixo-assinado.png';
import reuniaoSegurancaImage from '../assets/img/news/reuniao07-07.jpg';

const newsItems = [
  {
    title: 'Segurança, Sossego e Ações no Genebra',
    description: 'Na reunião do CONSEG, moradores cobraram fiscalização e soluções para a segurança e o sossego do bairro.',
    image: reuniaoSegurancaImage,
    alt: 'Reunião do CONSEG no bairro Genebra',
    link: '/noticias/reuniao-seguranca',
  },
  {
    title: 'Abaixo-Assinado por um Centro Cultural e Esportivo',
    description: 'As associações do bairro se unem para lançar um abaixo-assinado em defesa de um espaço público para lazer e cultura.',
    image: abaixoAssinadoImage,
    alt: 'Imagem do abaixo-assinado para um centro cultural e esportivo',
    link: '/noticias/abaixo-assinado',
  },
  {
    title: 'Memória e Continuidade: O Legado no Genebra',
    description: 'Hoje o nosso comunicado é de memória e prestação de contas sobre o legado do bairro.',
    image: caldoImage,
    alt: 'Foto do antigo caldo de cana',
    link: '/noticias/legado-genebra',
  },
  {
    title: 'Campanha de Castração Gratuita',
    description: 'Últimas vagas para a campanha de castração gratuita com informações importantes para tutores.',
    image: castracaoImage,
    alt: 'Cartaz da campanha de castração gratuita',
    link: '/noticias/castracao-gratuita',
  },
  {
    title: 'Os Impactos do Pedágio Free Flow no Genebra',
    description: 'Precisamos falar sobre o impacto da instalação do pedágio no tráfego e na segurança do bairro.',
    image: logoImage,
    alt: 'Logo da Associação do Bairro Genebra',
    link: '/noticias/pedagio-free-flow',
  },
  {
    title: 'O Desafio das Nossas Estradas',
    description: 'A falta de infraestrutura afeta diretamente a mobilidade e a segurança dos moradores.',
    image: logoImage,
    alt: 'Logo da Associação do Bairro Genebra',
    link: '/noticias/desafio-estradas',
  },
  {
    title: 'A Luta por Cultura e Esporte no Genebra',
    description: 'A comunidade segue mobilizada em defesa de espaços e oportunidades para crianças, jovens e idosos.',
    image: logoImage,
    alt: 'Logo da Associação do Bairro Genebra',
    link: '/noticias/cultura-esporte',
  },
];

const NewsPage = () => {
  return (
    <Section title="Notícias" subtitle="Acompanhe os principais comunicados e iniciativas da associação.">
      <div className={styles.grid}>
        {newsItems.map((item) => (
          <NewsCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default NewsPage;
