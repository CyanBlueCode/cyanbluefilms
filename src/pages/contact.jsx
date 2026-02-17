import ContactSection from '@/components/ContactSection';
import { useIsMobile } from '@/utils/useIsMobile';

const Contact = () => (
  <ContactSection
    title='Say Hello'
    titleVariant={useIsMobile() ? 'h4' : 'h2'}
    // isUpperCase={false}
    showMap={true}
    containerMaxWidth='md'
    containerSx={{ pt: 2 }}
    isPageTitle={true}
    // colors={{
    //   titleText: 
    // }}
  />
);

export default Contact;
