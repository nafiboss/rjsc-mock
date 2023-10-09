class AddressInfoForm extends BaseForm {
  divisionList = [];
  districtList = [];
  upazilaList = [];
  header = '';
  subHeader = '';
  formClassName = 'addressInfoForm';
  divisionSelectBoxClassName = 'divisionSelect';
  districtSelectBoxClassName = 'districtSelect';
  upazilaSelectBoxClassName = 'upazilaSelect';

  constructor(header, subHeader, divisionList, districtList, upazilaList) {
    super();
    console.log("SMNLOG :: Constructor : AddressInfoForm");
    this.header = header;
    this.subHeader = subHeader;
    this.divisionList = divisionList;
    this.districtList = districtList;
    this.upazilaList = upazilaList;
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
        + '                 <label class="form-label font-label">1. Division <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                  <label class="form-label font-label">2. District <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">3. Upojela/Thana <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox(this.upazilaList, this.upazilaSelectBoxClassName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100">'
        + '                 <label class="form-label font-label">4. Post Code</label>'
        + '                 <input type="email" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type post code"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-12">'
        + '             <div class="d-flex flex-column mb-4">'
        + '                 <label class="form-label font-label">5. Input your address.</label>'
        + '                 <div class="form-floating">'
        + '                 <textarea class="plc form-control" placeholder="Type your address" id="floatingTextarea2" style="height: 100px"></textarea>'
        + '                 <label class="plc">Comments</label>'
        + '                 </div>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100">'
        + '                 <label class="form-label font-label">6. Company Email<span class="red">*</span></label>'
        + '                 <input type="email" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Email"/>'
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100">'
        + '                 <label class="form-label font-label">7. Company Phone<span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Phone"/>'
        + '             </div>'
        + '         </div>'
        + '     </div>'
        + '</div>';

    return html;
  }

  bindEvents() {
    var self = this;
    $(document).on('change', '.divisionSelect', function(){
      Obrs.APP.updateDistrictSelect(
          $(this).val(),
          self._getDistrictElement()
      );

      Obrs.APP.makeSelectBoxEmpty(self._getUpazilaElement());
    });

    $(document).on('change', '.districtSelect', function(){
      Obrs.APP.updateUpazilaSelect(
          $(this).val(),
          self._getUpazilaElement()
      );
    });

    $(document).on('change', '.upazilaSelect', function(){
    });
  }
  _getBaseElementForThisForm(){
    return $(document).find('div.'+this.formClassName);
  }
  _getDistrictElement(){
    return this._getBaseElementForThisForm().find('select.' + this.districtSelectBoxClassName);
  }
  _getUpazilaElement(){
    return this._getBaseElementForThisForm().find('select.' + this.upazilaSelectBoxClassName);
  }
  getEmptyJsonData() {
    return {

    }
  }

}