class CompanyNameForm extends BaseForm {
  header = '';
  subHeader = '';
  formClassName = 'companyNameForm';

  constructor(header, subHeader) {
    super();
    console.log("SMNLOG :: Constructor : CompanyNameForm");
    this.header = header;
    this.subHeader = subHeader;
  }

  getFormData(){
    return '';
  }

  getFormHtml(headerEnable) {
    console.log("SMNLOG this.header::"+JSON.stringify(this.header));
    console.log("SMNLOG this.subHeader::"+JSON.stringify(this.subHeader));

    let html = '<div class="rounded border border-color d-flex flex-column">'

    if(headerEnable){
      html += super.getStepFormHeader(this.header);
    }

    html += super.getStepFormSubHeader(this.subHeader);

    html += '<div class="row p-4">'
        + '     <div class="col-md-6">'
        + '        <div class="d-flex flex-column mb-4">'
        + '           <label class="form-label font-label">1. Entity name (English) <span class="red">*</span></label>'
        + '           <input id="entityName" class="plc reg-form-input form-control"/>'
        + '        </div>'
        + '        <div class="d-flex flex-column w-100 mb-4">'
        + '           <label class="form-label font-label">2. Entity name (Bangla) <span class="red">*</span></label>'
        + '           <input class="plc reg-form-input form-control"/>'
        + '         </div>'
        + '         <div class="d-flex flex-column w-100 mb-4">'
        + '         <button class="btn btn-success" style="width: 200px;">Search</button>'
        + '         </div>'
        + '    </div>'
        + '  </div>'
        + '</div>';
    return html;
  }

  bindEvents() {
    console.log('Event binding....: Entity type form');
  }

  _getEntityTypeSelectBox(selectedValue){
    var html = '<select class="form-select plc reg-form-input form-control entityType">';
    html += '<option class="plc">Choose Any</option>';

    $.each(this.entityTypeList, function(idx, item){
      html += '<option class="plc" value="'+ item.id +'">'+ item.name +'</option>';
    });
    html += '</select>';

    return html;
  }

  getEmptyJsonData() {
    return {
      'companyName': '',
      'companyNameBn': ''
    }
  }

  $(document).on('click', '.btn-success', function(){
        console.log($('#entityName').val());
  });

}