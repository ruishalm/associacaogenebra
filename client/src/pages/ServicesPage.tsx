import Section from '../components/Section/Section';
import ServiceCard from '../components/Header/ServiceCard';
import UtilityCard from '../components/UtilityCard';
import Logo from '../components/Logo';
import styles from './ServicesPage.module.css';

const localBusinesses = [
  { name: 'Mercearia da Sede', category: 'Alimentação', contact: 'Em breve' },
  { name: 'Seu Comércio Aqui 1', category: 'Divulgue', contact: 'Fale com a associação' },
  { name: 'Seu Comércio Aqui 2', category: 'Divulgue', contact: 'Fale com a associação' },
  { name: 'Seu Comércio Aqui 3', category: 'Divulgue', contact: 'Fale com a associação' },
];

const publicServices = [
  {
    name: 'Boletim Eletrônico',
    category: 'Segurança',
    contact: 'Registre ocorrências online.',
    links: [
      { url: 'https://bopm.policiamilitar.sp.gov.br', text: 'Acessar Site' },
      { url: 'https://play.google.com/store/apps/details?id=br.gov.sp.policiamilitar.sp190&hl=pt_BR', text: 'App Google Play' }
    ]
  },
  {
    name: 'Emergências',
    category: 'Emergência',
    contact: 'Bombeiros: 📞 193\nSAMU: 📞 192\nPolícia Militar: 📞 190\nDisque-denúncia: 📞 181'
  },
  {
    name: 'Apoio Social',
    category: 'Apoio Social',
    contact: 'Atendimento à Mulher: 📞 180\nValorização da Vida (CVV): 📞 188'
  },
  {
    name: 'CPFL Energia',
    category: 'Energia',
    contact: '📞 0800 010 1010',
    links: [{ url: 'https://play.google.com/store/apps/details?id=br.gov.sp.policiamilitar.sp190&hl=pt_BR', text: 'App Google Play' }]
  },
  {
    name: 'Prefeituras',
    category: 'Serviço Municipal',
    contact: '📞 156 (Geral)\nAlumínio: 📞 (11) 4715-5500\nSorocaba: 📞 (15) 3238-2100'
  },
  {
    name: 'Zoonoses',
    category: 'Saúde Animal',
    contact: (
      <>
        Alumínio: 📞 (11) 4715-5513<br />
        Sorocaba: 📞 (15) 3229-7333<br /><br />
        SAMU Animal (Sorocaba):{' '}
        <a href="https://wa.me/5515991594118" target="_blank" rel="noopener noreferrer">
          🟢 (15) 99159-4118
        </a>
      </>
    )
  },
];

const otherUtilities = [
  { name: 'AGENDAMENTO SAÚDE CONSULTAS', contact: '(11) 4715-1284', details: 'Endereço: Rua Alberto Bertelle, 300, Vila Santa Luzia. E-mail: agendamentosaude@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'BANCO DO POVO PAULISTA', contact: '(11) 4715-2045', details: 'Endereço: Praça João de Castro Figueiroa. E-mail: bancodopovo@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'BIBLIOTECA MUNICIPAL', contact: '(11) 4715-2240', details: 'Endereço: Praça João de Castro Figueiroa. E-mail: biblioteca@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'BOLSA FAMÍLIA', contact: '(11) 4715-7923', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: bolsafamilia@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'CÂMARA MUNICIPAL', contact: '(11) 4715-4700', details: 'Endereço: Rua Hamilton Morati, 10, Vila Santa Luzia. Site: http://camaraaluminio.sp.gov.br/. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'CARTÓRIO DE REGISTRO CIVIL E TABELIONATO', contact: '(11) 4715-2404', details: 'Endereço: Rua José Cerione, 428, Vila Santa Luzia. E-mail: cartorioaluminio@terra.com.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'CENTRO DE CONTROLE DE ZOONOSES', contact: '(11) 4715-7221', details: 'Endereço: Rua José Lourenço, s/n, Bairro Irema. E-mail: controledevetores@aluminio.sp.gov.br. Horário: Seg a Sex – 08:00 as 16:00.' },
  { name: 'CENTRO DE PREVENÇÃO E COMBATE À DENGUE', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100, Vila Santa Luzia. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'CENTRO DE REFERÊNCIA A ASSISTÊNCIA SOCIAL - CRAS', contact: '(11) 4715-7801', details: 'Endereço: Rua José Lourenço, 100, Bairro Irema. E-mail: cras@aluminio.sp.gov.br. Horário: Seg a Sex – 08:00 as 16:00.' },
  { name: 'CENTRO DE SAÚDE - BAIRRO PAULO DIAS', contact: '(11) 4715-2943 / (11) 4715-3179', details: 'Endereço: Av Paulo Dias, 412, Vila Paulo Dias. E-mail: centrodesaude@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'CENTRO DE SAÚDE BAIRRO ITARARÉ', contact: '(11) 4715-1013', details: 'Endereço: Estrada Jasiel Ferreira Prado, 3230, Bairro Itararé. E-mail: centrodesaude@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'CENTRO DE SAÚDE MENTAL', contact: '(11) 4715-1344', details: 'Endereço: Rua Evandro Bocato, 03, Vila Santa Luzia. E-mail: saudemental@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'CENTRO ODONTOLÓGICO', contact: '(11) 4715-7260', details: 'Endereço: Rua Alberto Bertelli, 300, Jardim Olidel. E-mail: centroodontologico@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'CHAVEIRO', contact: '(11) 4715-2169', details: 'Endereço: Rua Paulo Dias, Vila Paulo Dias. Horário: Seg a Sex – 08:00 as 16:00.' },
  { name: 'CONSELHO TUTELAR', contact: '(11) 4715-7149 / Plantão: (11) 97576-6110', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: conselhotutelar@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'CRECHE MUNICIPAL BENEDITA FURQUIM DIAS', contact: '(11) 4715-7619 / 7620', details: 'Endereço: Rua Octávio Corrêa da Costa, 242, Vila Paraíso. E-mail: creche@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 17:00.' },
  { name: 'DEFESA CIVIL', contact: '199 ou (11) 4715-2103', details: 'Endereço: Rua Manoel Pereira, S/N, Vila Pedágio. E-mail: defesacivil@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DELEGACIA DE POLÍCIA CIVIL', contact: '(11) 4715-1477', details: 'Endereço: R José Maria Borges, 152. Site: https://www.policiacivil.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE ADMINISTRAÇÃO', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: administracao@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE EDUCAÇÃO', contact: '(11) 4715-5500 – Ramal 5523', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: educacao@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE FINANÇAS', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: financas@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE GOVERNO', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: deptodegoverno@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE MEIO AMBIENTE', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: meioambiente@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE NEGÓCIOS JURIDICOS', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: juridico@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE PLANEJAMENTO E OBRAS', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: planejamento@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE SAÚDE', contact: '(11) 4715-3889', details: 'Endereço: Rua Alberto Bertelle, 300, Jardim Olidel. E-mail: depto_saude@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DE SERVIÇOS URBANOS', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: servicosurbanos@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DEPARTAMENTO MUNICIPAL DO DESENVOLVIMENTO SOCIAL', contact: '(11) 4715-7801', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100, Vila Sta. Luzia. E-mail: desensocial@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DIVISÃO DE RENDAS E TRIBUTOS', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: rendas@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'DIVISÃO DE TRÂNSITO ESTADUAL - CIRETRAM', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100 – Vila Sta. Luzia. Horário: Seg a Sex – 09:00 as 17:00.' },
  { name: 'DIVISÃO DE TRÂNSITO MUNICIPAL', contact: '(11) 4715-1590', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: transito@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'EMPRESA BRASILEIRA DE CORREIOS E TELÉGRAFOS - CORREIOS', contact: '(11) 4715-1022', details: 'Endereço: Rua Hamilton Morati, 66, Centro. Site: http://www.correios.com.br/. Horário: Seg a Sex – 08:00 as 17:00.' },
  { name: 'ESCOLA ESTADUAL HONORINA RIOS CARVALHO MELLO', contact: '(11) 4715-1388', details: 'Endereço: Rua Floriano Vieira, 125, Jardim Progresso. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL COMENDADOR RODOVALHO', contact: '(11) 4715-1350', details: 'Endereço: Rua Antonio Dias, 20 – Vila Paulo Dias. E-mail: escolarodovalho@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL Dr.ROBERTO NEY NAVAES DE FIGUEIREDO', contact: '(11) 4715-7816', details: 'Endereço: Rua, Antonio Russo, 301 – Jardim Olidel. E-mail: escolarobertoney@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL ENG. ANTONIO DE CASTRO FIGUEIROA', contact: '(11) 4715-7096', details: 'Endereço: Rua Luiz Martins, n.º 100, Jardim Olidel. E-mail: escolafigueiroa@aluminio.sp.gov.br. Horário: Seg a Sex – 08:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL JOÃO DE ALMEIDA', contact: '(11) 4715-3789', details: 'Endereço: Rua Benedito Vieira, 20 – Bairro Itararé. E-mail: escolajoaodealmeida@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL JOSE JESUS PAES', contact: '(11) 4715-7429', details: 'Endereço: Estrada Santa Rita, 5772 – Bairro Figueiras. E-mail: escolajosejesuspaes@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL JOSÉ JOAQUIM DA SILVA', contact: '(11) 4715-3674', details: 'Endereço: Rua Ilhéus, 51 – Vila Paraíso. E-mail: escolajosejoaquim@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL MANOEL NETTO FILHO', contact: '(11) 4715-3610', details: 'Endereço: Rua Eduardo Grillo, 300 – Vila Pedágio. E-mail: escolamanoelnetto@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 17:00.' },
  { name: 'ESCOLA MUNICIPAL PROFª ISAURA KRUGER', contact: '(11) 4715-1922', details: 'Endereço: Av. Santiago, 468 – Vila Industrial. E-mail: escolaisaurakrunger@aluminio.sp.gov.br. Horário: Seg a Sex – 08:00 as 16:00.' },
  { name: 'ESCOLA MUNICIPAL VICENTE BOTTI', contact: '(11) 4715-2482', details: 'Endereço: Praça João de Castro Figueiroa, 02 – Vila Industrial. E-mail: escolavicentebotti@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'ESCOLA MÚSICA', contact: '(11) 4715-2241', details: 'Endereço: Praça João de Castro Figueiroa, 02 – Vila Industrial. E-mail: biblioteca@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'FARMÁCIA PÚBLICA (LOCAL CENTRO DE SAÚDE)', contact: '(11) 4715-2286', details: 'Endereço: Av. Paulo Dias, 412, Vila Paulo Dias. E-mail: centrodesaude@aluminio.sp.gov.br. Horário: Seg a Sex – 07:00 as 16:00.' },
  { name: 'FUNDO SOCIAL', contact: '(11) 4715-5120', details: 'Endereço: Rua dos Cambaras, 278, Jardim Olidel. E-mail: fundosocial@aluminio.sp.gov.br. Horário: Seg a Sex – 08:00 as 16:00.' },
  { name: 'GARAGEM DO TRANSPORTE ESCOLAR', contact: '(11) 4715-3993', details: 'Endereço: Rua José Lorenço, Bairro Irema. E-mail: transporte@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'GINÁSIO MUNICIPAL PAULO JACOB', contact: '(11) 4715-2244', details: 'Endereço: Rodovia Raposo Tavares. E-mail: esporte@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 16:00.' },
  { name: 'ILUMINAÇÃO PUBLICA - SOLICITAÇÕES E RECLAMAÇÕES', contact: '0800-000-0209', details: 'Atendimento para toda a cidade de Alumínio.' },
  { name: 'JUNTA MILITAR', contact: '(11) 4715-5500', details: 'Endereço: Av. Eng. Antonio de Castro Figueiroa, 100. E-mail: juntamilitar@aluminio.sp.gov.br. Horário: Seg a Sex – 09:00 as 14:00.' },
  { name: 'POLÍCIA MILITAR', contact: '(11) 4715-3808 – 190', details: 'Endereço: Rua Floriano Vieira, 76, Vila Pedágio. Site: http://www.policiamilitar.sp.gov.br/' },
];

const ServicesPage = () => {
  return (
    <Section
      title="Serviços do Bairro"
      subtitle="Encontre e apoie os comerciantes e prestadores de serviço da nossa comunidade."
    >
      <div className={styles.servicesContainer}>
        <details className={styles.collapsibleSection} open>
          <summary className={styles.categoryTitle}>Serviços Públicos</summary>
          <div className={`${styles.grid} ${styles.collapsibleContent}`}>
            {publicServices.map((service) => (
              <ServiceCard key={service.name} {...service} />
            ))}
          </div>
        </details>

        <details className={styles.collapsibleSection} open>
          <summary className={styles.categoryTitle}>Comércio Local</summary>
          <div className={`${styles.grid} ${styles.collapsibleContent}`}>
            <ServiceCard
              key="Mercearia da Sede"
              name="Mercearia da Sede"
              category="Alimentação"
              contact="Em breve"
            />
            <div className={styles.promoCard}>
              <span className={styles.promoCategory}>Sites e Soluções Web</span>
              <div className={styles.promoLogo}>
                <Logo
                  href="https://wa.me/5515981539443"
                  title="Fale com o desenvolvedor"
                  size="normal"
                />
              </div>
              <a href="https://wa.me/5515981539443" className={styles.promoWhatsapp} target="_blank" rel="noopener noreferrer">
                🟢 (15) 98153-9443
              </a>
            </div>
            {localBusinesses.slice(1).map((service) => (
              <ServiceCard
                key={service.name}
                {...service}
              />
            ))}
          </div>
        </details>

        <details className={styles.collapsibleSection}>
          <summary className={styles.categoryTitle}>
            Outras Utilidades (Alumínio)
          </summary>
          <div className={`${styles.utilityGrid} ${styles.collapsibleContent}`}>
            {otherUtilities.map((utility) => (
              <UtilityCard
                key={utility.name}
                {...utility}
              />
            ))}
          </div>
        </details>
      </div>
    </Section>
  );
};

export default ServicesPage;