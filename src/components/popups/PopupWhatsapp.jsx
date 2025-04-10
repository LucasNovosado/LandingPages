import React, { useState } from 'react';
import Button from '../ui/Button';
import { extractWhatsAppNumber } from '../../utils/formatters';
import useGTM from '../../hooks/useGTM';

const PopupWhatsapp = ({ storeData, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { logWhatsAppFormSubmit } = useGTM(storeData);

  // Validar o número de telefone
  const validatePhone = (value) => {
    // Remover todos os caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    // Verificar se tem pelo menos 10 dígitos (DDD + número)
    return cleaned.length >= 10;
  };

  // Lidar com a mudança no input
  const handleChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsValid(validatePhone(value));
  };

  // Formatar o número do telefone para exibição
  const formatPhoneInput = (value) => {
    // Remover todos os caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    
    // Aplicar máscara
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`;
    }
    
    return formatted;
  };

  // Lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isValid && storeData?.link_whatsapp) {
      // Extrair o número do WhatsApp da loja
      const storeWhatsApp = extractWhatsAppNumber(storeData.link_whatsapp);
      
      // Registrar o evento no GTM
      logWhatsAppFormSubmit({ numero: phoneNumber });
      
      // Construir o link do WhatsApp com a mensagem
      const message = encodeURIComponent(`Olá! Vi a landing page de baterias em ${storeData.cidade} e gostaria de mais informações.`);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${storeWhatsApp}&text=${message}`;
      
      // Abrir o WhatsApp em uma nova aba
      window.open(whatsappUrl, '_blank');
      
      // Fechar o popup
      if (onClose) onClose();
    }
  };

  return (
    <div className="popup-whatsapp bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-primary mb-2">Fale com a gente no WhatsApp</h3>
        <p className="text-gray-600">
          Informe seu número para continuarmos o atendimento no WhatsApp:
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="font-semibold">
            Seu número de WhatsApp:
          </label>
          <input
            type="tel"
            id="phone"
            value={formatPhoneInput(phoneNumber)}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="text-xs text-gray-500">
            Ex: (43) 99999-9999
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            type="submit" 
            variant="whatsapp" 
            fullWidth 
            disabled={!isValid}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            }
          >
            Iniciar Conversa
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PopupWhatsapp;