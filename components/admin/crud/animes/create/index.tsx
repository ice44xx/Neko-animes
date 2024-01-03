import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import ButtonComponent from '../../../../common/button';
import SelectInput from '../../../../common/select';
import TextAreaComponent from '../../../../common/textarea';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import animes_services, { Animes } from '../../../../../services/animes/animes.service';

const AnimesCreate = () => {
  const [animes, setAnimes] = useState<Animes>({
    name: '',
    synopsis: '',
    thumbnailUrl: '',
    feature: true,
    types: '',
    categoryNames: [],
    classificationName: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await animes_services.create(animes);

      Swal.fire('Sucesso!', 'Anime criado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const featureValue = value === 'sim';
    setAnimes((prevAnimes) => ({
      ...prevAnimes,
      feature: featureValue,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(',').map((category) => category.trim());
    setAnimes((prevAnimes) => ({
      ...prevAnimes,
      categoryNames: categories,
    }));
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="name" value={'Nome do anime'} />
            <InputComponent
              placeholder="Exemplo Jujutsu No kaisen..."
              id="name"
              name="name"
              onChange={(e) => setAnimes({ ...animes, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="type" value={'Tipo do anime'} />
            <InputComponent
              placeholder="Exemplo: Series ou Movies"
              id="type"
              name="type"
              onChange={(e) => setAnimes({ ...animes, types: e.target.value })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="synopsis" value={'Synopsis'} />
        <TextAreaComponent
          rows={3}
          name="synopsis"
          onChange={(e) => setAnimes({ ...animes, synopsis: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="thumbnailUrl" value={'Thumbnail'} />
        <InputComponent
          placeholder="Exemplo: https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/jujutsu_aboouc_ehronz.webp"
          id="thumbnailUrl"
          name="thumbnailUrl"
          onChange={(e) => setAnimes({ ...animes, thumbnailUrl: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group_select}>
        <LabelComponent value={'Em destaque ?'} />
        <SelectInput value={animes.feature} optionsType="feature" onChange={handleSelectChange} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="classificationName" value={'Classificação'} />
        <InputComponent
          placeholder="Exemplo: Seinen"
          id="classificationName"
          name="classificationName"
          onChange={(e) => setAnimes({ ...animes, classificationName: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="categoryNames" value={'Categorias'} />
        <InputComponent
          placeholder="Exmeplo: aventura, terror"
          id="categoryNames"
          name="categoryNames"
          onChange={handleCategoryChange}
        />
      </FormGroup>
      <ButtonComponent value="Lançar anime" className={styles.btn} />
    </Form>
  );
};

export default AnimesCreate;
