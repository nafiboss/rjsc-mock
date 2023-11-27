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
        + '         <div class="col-md-6 qualified-share" style="display:none;">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">4. Number of Qualified Shares <span class="red">*</span></label>'
        + '                 <input type="text" class="plc reg-form-input form-control" placeholder="Number of Qualified Shares"/>'
        + '             </div>'
        + '         </div>'
        + '          <div class="row col-md-6 public-limited" style="display:none;">'
          + '                 <div class="col-md-12 mb-4">'
          + '                     <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
          + '                         <span class="all-label">3. Witness to the agreement of taking qualification Shares</span>'
          + '                     </div>'
          + '                  </div>'
          + '         <div class="col-md-12">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label">1. National ID<span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type your National ID"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-12">'
          + '            <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>Date of Birth<span class='red'>*</span></label>"
          + '                 <input type="date" name="dob" class="dob form-control plc" placeholder="Choose date of birth"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-12">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label">2. Witness Name<span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type your name"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>5. Phone/Mobile<span class='red'>*</span></label>"
          + '                 <input type="text" class="plc reg-form-input form-control phone" placeholder="Enter your Phone/Mobile no"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-3">'
          + "                 <label class='form-label font-label'>6. Email<span class='red'>*</span></label>"
          + '                 <input type="email" class="plc reg-form-input form-control email" placeholder="Enter your email address"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">3. Division <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox(this.divisionList, this.divisionSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                  <label class="form-label font-label">4. District <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox(this.districtList, this.districtSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label">5. Upojela/Thana <span class="red">*</span></label>'
          +                   Obrs.APP.getCommonSelectBox(this.upazilaList, this.upazilaSelectBoxClassName, '')
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100">'
          + '                 <label class="form-label font-label">6. Post Code</label>'
          + '                 <input type="email" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type post code"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-12">'
          + '             <div class="d-flex flex-column mb-4">'
          + '                 <label class="form-label font-label">7. Input your address.</label>'
          + '                 <div class="form-floating">'
          + '                 <textarea class="plc form-control" placeholder="Type your address" id="floatingTextarea2" style="height: 100px"></textarea>'
          + '                 <label class="plc">Comments</label>'
          + '                 </div>'
          + '             </div>'
          + '         </div>'
                + '</div>'
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