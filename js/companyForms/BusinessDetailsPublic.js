class BusinessDetailsPublic extends BaseForm {
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
          + '                 <label class="form-label font-label">1. Amount of share capital of the Company subject to the payment of the whole amount thereof in cash (BDT) <span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control authorixedCapital" placeholder="Amount of share capital"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                  <label class="form-label font-label">2. Amount fixed by the Memorandum or Articles and named in the statement as the minimum subscription upon which the directors may proceed to allotment (BDT)<span class="red">*</span></label>'
          + '                 <input type="text" class="plc reg-form-input form-control noOfShare" placeholder="Amount fixed by the Memorandum or Articles"/>'
          + '             </div>'
          + '         </div>'
          + '         <div class="col-md-6">'
          + '             <div class="d-flex flex-column w-100 mb-4">'
          + '                 <label class="form-label font-label">3. Shares held subject to the payment of the whole amount thereof in cash have been allotment to the amount (BDT)  <span class="red">*</span></label>'
          + '                 <input type="email" class="plc reg-form-input form-control" placeholder="Shares held subject to the payment of the whole amount"/>'
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