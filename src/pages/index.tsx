import React from 'react';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Layout from '../components/Layout';
import WorksSection from '../components/WorksSection';
import OrderSection from '../components/OrderSection';

const IndexPage = () => (
  <Layout>
    <AboutSection />
    <WorksSection variant="dark" />
    <ContactSection my={[4, 5]} />
    <OrderSection />
  </Layout>
);

export default IndexPage;
