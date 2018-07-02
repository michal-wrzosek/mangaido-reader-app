import * as types from '../constants';

const initialState = {
  menu_info_btn: 'Info',
  menu_chapters_btn: 'Chapters',
  menu_translations_btn: 'Translations',
  menu_social_btn: 'Social',
  menu_next_btn: 'Next',
  menu_read_btn: 'Read',
  info_page_series_label: 'Series:',
  info_page_chapter_label: 'Chapter:',
  info_page_original_language_label: 'Original language:',
  info_page_author_label: 'Author:',
  info_page_translator_label: 'Translator:',
  info_page_translation_language_label: 'Translation language:',
  info_page_description_label: 'Description:',
  info_page_is_for_adults_label: 'Is for adults:',
  info_page_is_for_adults_yes: 'Yes',
  info_page_is_for_adults_no: 'No',
  chapters_page_created_ago: 'Created __VARIABLE__ ago',
  translations_page_created_ago: 'Created __VARIABLE__ ago',
  translations_page_updated_ago: 'Updated __VARIABLE__ ago',
  translations_page_nr_of_words: 'Nr of words: __VARIABLE__',
  translations_page_nr_of_characters: 'Nr of characters: __VARIABLE__',
  translations_page_show_btn: 'Show',
  translations_page_close_btn: 'Close',
  translations_page_edit_btn: 'Edit',
  translation_form_create_btn: 'Create translation',
  page_back_btn: 'Back',
  comments_time_ago: '__VARIABLE__ ago',
  comments_avatar_image_text: "User's avatar",
  comments_text_area_placeholder: 'Say something',
  comments_sumbmit_btn: 'Submit',
  ending_page_related_series_title: 'Related series:',
  ending_page_donate_author_btn: 'Donate author',
  ending_page_donate_translator_btn: 'Donate translator',
  ending_page_next_chapter_cover_text: "Chapter's cover",
  ending_page_next_chapter_btn: 'Next chapter',
  ending_page_related_series_cover_text: "Series's cover",
  ending_page_related_series_show_btn: 'Show',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return {
        ...state,
        ...action.i18n,
      };
    default:
      return state;
  }
};
