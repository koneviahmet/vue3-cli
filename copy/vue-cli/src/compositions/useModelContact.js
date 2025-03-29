import { ref, reactive } from "vue";
import ContactServices from "../services/ContactServices";
import Alert from "../utils/alert";

export default function useModelContact() {
  const loading = ref(false);
  const submitted = ref(false);
  const contactForm = reactive({
    contact_name: "",
    contact_email: "",
    contact_subject: "",
    contact_message: "",
    contact_status: "new",
    contact_created_at: "",
    contact_updated_at: ""
  });

  const resetForm = () => {
    contactForm.contact_name = "";
    contactForm.contact_email = "";
    contactForm.contact_subject = "";
    contactForm.contact_message = "";
    contactForm.contact_status = "new";
    contactForm.contact_created_at = "";
    contactForm.contact_updated_at = "";
    submitted.value = false;
  };

  const submitContactForm = async () => {
    try {
      loading.value = true;
      
      // Add created and updated date to form
      const now = new Date().toISOString();
      contactForm.contact_created_at = now;
      contactForm.contact_updated_at = now;
      
      // Submit form data to API
      await ContactServices.submitContactForm(contactForm);
      
      // Show success message
      Alert.showSuccess("Mesajınız başarıyla gönderildi. En kısa sürede size geri dönüş yapacağız.");
      
      // Reset form after successful submission
      resetForm();
      submitted.value = true;
      
      return true;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      Alert.showWarning("Mesajınız gönderilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.");
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    contactForm,
    loading,
    submitted,
    submitContactForm,
    resetForm
  };
} 