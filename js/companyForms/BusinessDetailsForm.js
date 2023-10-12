class BusinessDetailsForm extends BaseForm {
  header = '';
  subHeader = '';
  formClassName = 'businessDetailsForm';
  authCapitalClassName = 'authCapital';
  noOfShareClassName = 'noOfShare';
  valueOfEachShareClassName = 'noOfShare';
  
  constructor(header, subHeader) {
    super();
    console.log("SMNLOG :: Constructor : BusinessDetailsForm");
    this.header = header;
    this.subHeader = subHeader;
  }

  getFormData(){
    return '';
  }

  getFormHtml(headerEnable) {
    let html = '<div class="rounded border border-color d-flex flex-column '+ this.formClassName +'">'

    if(headerEnable){
      html += super.getStepFormHeader(this.header);
    }

    html += super.getStepFormSubHeader(this.subHeader);

    html += '    <div class="row p-4">'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column mb-4">'
        + '                 <label class="form-label font-label">1. Authorized Capital <span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control authorixedCapital" placeholder="Authorized Capital"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                  <label class="form-label font-label">2. No of Share <span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control noOfShare" placeholder="No of Share"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">3. Value Of Each Share <span class="red">*</span></label>'
        + '                 <input type="email" class="plc reg-form-input form-control" placeholder="Value of each share "/>'
        + '             </div>'
        + '         </div>'
        + '          <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">6. MOA Liability <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox([], this.moaLiabilityName, '')
        + '             </div>'
        + '         </div>'
        + '    </div>'
        + '</div>';

    return html;
  }

  bindEvents() {
    var self = this;

    $(document).on('change', '.'+ this.moaSectionName, function(){
      Obrs.APP.updateBusinessDivisionSelect(
          $(this).val(),
          self._getElementByClass(self.moaDivisionName)
      );

      // Obrs.APP.makeSelectBoxEmpty(self._getUpazilaElement());

      // self._clearUpazilaSelect();
    });
  }
  _getBaseElementForThisForm(){
    return $(document).find('div.'+this.formClassName);
  }
  _getElementByClass(className){
    return this._getBaseElementForThisForm().find('.' + className);
  }
  getEmptyJsonData() {
    return {

    }
  }

}