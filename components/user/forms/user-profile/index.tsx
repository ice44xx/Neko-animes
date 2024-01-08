import styles from '../styles.module.scss';
import ButtonComponent from '../../../common/button';
import Image from 'next/image';
import firebase from 'firebase/compat/app';
import Cat from '@/public/assets/cat_profile.png';
import 'firebase/compat/storage';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import users_service, { User } from '../../../../services/users/users.service';
import { useRouter } from 'next/router';

const firebaseConfig = {
  apiKey: 'AIzaSyBpzqmC9Lg4y6cEoF4W9YEok4Xosm7rmy4',
  authDomain: 'neko-animes-862d5.firebaseapp.com',
  projectId: 'neko-animes-862d5',
  storageBucket: 'neko-animes-862d5.appspot.com',
  messagingSenderId: '1016112572732',
  appId: '1:1016112572732:web:ca97e7411d155220a19639',
};

firebase.initializeApp(firebaseConfig);

const UserProfile = () => {
  const storage = firebase.storage();
  const router = useRouter();
  const [image, setImage] = useState('');
  const [data, setData] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await users_service.getUser();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const generateUniqueFileName = (originalFileName: string, userId: number) => {
    const fileExtension = originalFileName.split('.').pop();
    return `${userId}.${fileExtension}`;
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const storageRef = storage.ref();
        const userId = data?.id;
        if (userId !== undefined) {
          const fileName = generateUniqueFileName(file.name, userId);
          const fileRef = storageRef.child(`Profile/${fileName}`);

          await fileRef.put(file);
          const imageUrl = await fileRef.getDownloadURL();

          setImage(imageUrl);
          localStorage.setItem('imageUrl', imageUrl);
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imageUrl = localStorage.getItem('imageUrl');
      await users_service.updateProfile({ profile: imageUrl! });

      setTimeout(() => {
        router.reload();
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar a imagem', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdateProfile}>
      <FormGroup className={styles.form_group_profile}>
        <Label htmlFor="profileImage">
          <div className={styles.container_profile}>
            {image ? (
              <Image src={image} alt="Foto de perfil" fill className={styles.profile} />
            ) : (
              <Image src={Cat} alt="Foto de perfil padrão" className={styles.default} />
            )}
          </div>
        </Label>
        <p className={styles.obs}>
          Atenção: <span>NÃO</span> utilize foto inapropriada no site, arquivo max: <span>1MB</span>
        </p>
        <Input type="file" id="profileImage" className={styles.file} onChange={handleImageChange} />
      </FormGroup>
      <ButtonComponent value={'Salvar alterações'} className={styles.btn} />
    </Form>
  );
};

export default UserProfile;
