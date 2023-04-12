import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axios';
import ReCAPTCHA from 'react-google-recaptcha';

import { toastError, toastSuccess } from '@/utils/toasts';

type Props = {};

const Page = ({}: Props) => {
  const recaptchaRef = useRef(null);
  const router = useRouter();
  const token = router.query.token as string;
  const [loading, setLoading] = useState(true);

  const verifyEmail = async () => {
    const recaptchaValue = await recaptchaRef.current.executeAsync();

    try {
      await axiosInstance.post('/verificar-email', {
        token,
        recaptcha: recaptchaValue,
      });
      toastSuccess('Email verificado com sucesso!');
      router.back();
    } catch (e) {
      toastError('Erro ao verificar email!');
      recaptchaRef.current.reset();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-20 space-y-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">Verificando email...</div>
          <div className="text-gray-500">Aguarde um momento...</div>
        </div>
      ) : null}
      <ReCAPTCHA
        badge="inline"
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
        ref={recaptchaRef}
      />
    </div>
  );
};

export default Page;
