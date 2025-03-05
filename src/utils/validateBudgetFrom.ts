export const validateBudgetForm = (
    name: string,
    phone: string,
    email: string,
    selectedCards: { id: number; title: string; price: number; text: string; languages?: number; pages?: number }[]
  ) => {
    const newErrors: { [key: string]: string } = {};
  
    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }
  
    if (!phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    }
  
    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido";
    }
  
    if (selectedCards.length === 0) {
      newErrors.services = "Debe seleccionar al menos un servicio";
    }
  
    const webService = selectedCards.find((card) => card.title === "WEB");
    if (webService) {
      const hasPagesOrLanguages =
        (webService.pages && webService.pages > 0) &&
        (webService.languages && webService.languages > 0);
      if (!hasPagesOrLanguages) {
        newErrors.webDetails = "Un servicio WEB debe incluir al menos una página y un lenguaje";
      }
    }
  
    return newErrors;
  };