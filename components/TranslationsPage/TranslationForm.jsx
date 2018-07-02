import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Select,
} from 'react-form';
import * as s from './TranslationForm.scss';
import FormLoader from '../FormLoader';
import I18n from '../I18n';

const TranslationForm = ({
  isTranslationsFormLoading,
  languages,
  i18n,
  handleTranslationFormSubmit,
}) => {
  const languageOptions = languages.map(l => ({
    label: l.name,
    value: l.code,
  }));

  return (
    <div className={s.TranslationForm}>
      <Form
        onSubmit={values => handleTranslationFormSubmit(values.language)}
        defaultValues={{ language: 'en_US' }}
      >
        { formApi => (
          <form
            onSubmit={formApi.submitForm}
            className={s.TranslationForm__form}
          >
            <Select
              field="language"
              id="language"
              options={languageOptions}
              className={s.TranslationForm__form__select}
            />
            <div className={s.TranslationForm__form__actions}>
              <button
                type="submit"
                className={s.TranslationForm__form__btn}
              >
                <I18n i18n={i18n} t="translation_form_create_btn" />
              </button>
            </div>
            {isTranslationsFormLoading &&
              <FormLoader />
            }
          </form>
        )}
      </Form>
    </div>
  );
};

TranslationForm.propTypes = {
  isTranslationsFormLoading: PropTypes.bool.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
  handleTranslationFormSubmit: PropTypes.func.isRequired,
};

export default TranslationForm;
