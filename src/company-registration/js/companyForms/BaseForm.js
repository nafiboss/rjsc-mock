class BaseForm {
  masterData = {};

  /**
   * @desc this method will return form data as JSON
   * @return JSON:formData
   */
  getFormData(){
    throw new Error('Get Form data method must be implemented in derived classes');
  }

  /**
   * @desc this method will return HTML of derived form
   * @return String:formHTML
   */
  getFormHtml() {
    throw new Error('Form html method must be implemented in derived classes');
  }

  /**
   * @desc this method will bind all kinds of HTML element events
   * @return
   */
  bindEvents() {
    throw new Error('Bind events method must be implemented in derived classes');
  }

  /**
   * @desc this method will return an empty JSON data
   * @return
   */
  getEmptyJsonData() {
    throw new Error('Empty JSON data method must be implemented in derived classes');
  }

  getStepFormHeader(header){
    let html = '';
    if(header && header !== ''){
      html =    ' <div class="row border-bottom mx-0 light-blue-bg">'
          + '   <div class="col-md-12 p-2 ps-3">'
          + '     <div class="d-flex w-100">'
          + '       <div class="all-label dark-blue-text d-flex gap-2">'+ header +'</div>'
          + '     </div>'
          + '   </div>'
          + ' </div>';
    }
    return html;
  }

  getStepFormSubHeader(subHeader){
    let html = '';

    if(subHeader && subHeader !== ''){
      html = '<div class="row p-4">'
          + '     <div class="col-md-12">'
          + '         <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '            <span class="all-label">'+ subHeader +'</span>'
          + '         </div>'
          + '     </div>'
          + ' </div>';
    }
    return html;
  }
}