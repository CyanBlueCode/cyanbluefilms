import ContactSection from '@/components/ContactSection';

const Contact = () => (
  <ContactSection
    title='Say Hello!'
    titleVariant='h2'
    isUpperCase={false}
    showMap={true}
    containerMaxWidth='md'
    containerSx={{ py: 10 }}
  />
);

export default Contact;
