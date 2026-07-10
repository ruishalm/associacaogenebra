import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard/NewsCard';
import Section from '../components/Section/Section';
import styles from './HomePage.module.css';

import castracaoImage from '../assets/img/cards/castracao.png';
import caldoImage from '../assets/img/legacy/caldo.jpg';
import abaixoAssinadoImage from '../assets/img/news/abaixo-assinado.png';
import reuniaoSegurancaImage from '../assets/img/news/reuniao07-07.jpg';

const featuredNews = [
  {
    title: 'Campanha de Castração Gratuita',
    description: 'Últimas vagas para a campanha e informações importantes para tutores de cães e gatos.',
    image: castracaoImage,
    alt: 'Cartaz da campanha de castração gratuita',
    link: '/noticias/castracao-gratuita',
  },
  {
    title: 'Segurança, Sossego e Ações no Genebra',
    description: 'Resumo da reunião do CONSEG e das demandas da comunidade por mais segurança e fiscalização.',
    image: reuniaoSegurancaImage,
    alt: 'Reunião do CONSEG no bairro Genebra',
    link: '/noticias/reuniao-seguranca',
  },
  {
    title: 'Abaixo-Assinado por um Centro Cultural e Esportivo',
    description: 'A associação e os moradores reivindicam um espaço de lazer e cultura para o bairro.',
    image: abaixoAssinadoImage,
    alt: 'Imagem do abaixo-assinado para um centro cultural e esportivo',
    link: '/noticias/abaixo-assinado',
  },
  {
    title: 'Memória e Continuidade: O Legado no Genebra',
    description: 'Acompanhamento de um tema importante para a memória e o futuro do bairro.',
    image: caldoImage,
    alt: 'Foto do antigo caldo de cana',
    link: '/noticias/legado-genebra',
  },
];

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBlock}>
            <p className={styles.heroEyebrow}>Associação de Moradores</p>
            <h1>Associação de moradores do bairro Genebra</h1>
            <p className={styles.heroSubtitle}>Alumínio e Sorocaba</p>
            <p className={styles.highlightTextHero}>Juntos somos mais fortes.</p>
            <div className={styles.heroActions}>
              <Link to="/sobre" className={styles.primaryButton}>Conheça a associação</Link>
              <Link to="/noticias" className={styles.secondaryButton}>Ver notícias</Link>
            </div>
          </div>
          <div className={styles.heroBadge}>
            <span>Comunidade</span>
            <strong>Participação</strong>
          </div>
        </div>
      </section>

      <Section variant="highlight" title="Sobre Nós" subtitle="Representamos os interesses da comunidade com transparência e participação.">
        <p className={styles.sectionText}>
          A Associação de Moradores do Bairro Genebra é o elo que une a comunidade na divisa entre Alumínio e Sorocaba.
          Somos uma organização sem fins lucrativos, formada por vizinhos e para os vizinhos, com o propósito de lutar por um bairro melhor.
          Atuamos de forma transparente na representação dos interesses dos moradores junto aos poderes públicos de ambas as cidades,
          cobrando melhorias em infraestrutura, segurança, saneamento, lazer e cultura.
        </p>
      </Section>

      <Section title="Destaque da Semana" subtitle="Principais iniciativas e ações que movimentam o bairro.">
        <div className={styles.highlightCard}>
          <img src={abaixoAssinadoImage} alt="Imagem do abaixo-assinado para um centro cultural e esportivo" className={styles.highlightImage} />
          <div className={styles.highlightText}>
            <h3>Abaixo-Assinado por um Centro Cultural e Esportivo</h3>
            <p>
              Vários moradores têm procurado as associações para falar sobre a falta de locais de lazer no Genebra.
              A proposta é reunir apoiadores e pressionar o poder público por um espaço adequado para cultura, esportes e oficinas.
            </p>
            <Link to="/noticias/abaixo-assinado" className={styles.highlightLink}>Leia mais</Link>
          </div>
        </div>
      </Section>

      <Section title="Notícias Recentes" subtitle="Os principais assuntos que movimentam o bairro e a associação.">
        <div className={styles.cardsGrid}>
          {featuredNews.map((item) => (
            <NewsCard key={item.title} {...item} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
