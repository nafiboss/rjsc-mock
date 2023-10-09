class BusinessObjectForm extends BaseForm {
  moaSectionList = [];
  moaDivisionList = [];
  moaGroupList = [];
  moaClassList = [];
  moaSubclassList = [];
  moaLiabilityList = [];
  header = '';
  subHeader = '';
  formClassName = 'businessObjectForm';
  moaSectionName = 'moaSectionSelect';
  moaDivisionName = 'moaDivisionSelect';
  moaGroupName = 'moaGroupSelect';
  moaClassName = 'moaClassSelect';
  moaSubClassName = 'moaSubClassSelect';

  constructor(header, subHeader, moaSectionList) {
    super();
    console.log("SMNLOG :: Constructor : BusinessObject");
    this.header = header;
    this.subHeader = subHeader;
    this.moaSectionList = moaSectionList;
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
        + '                 <label class="form-label font-label">1. Section <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox(this.moaSectionList, this.moaSectionName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                  <label class="form-label font-label">2. Division <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox([], this.moaDivisionName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">3. Group <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox([], this.moaGroupName, '')
        + '             </div>'
        + '         </div>'
        + '         <div class="col-md-6">'
        + '             <div class="d-flex flex-column w-100 mb-4">'
        + '                 <label class="form-label font-label">4. Class <span class="red">*</span></label>'
        +                   Obrs.APP.getCommonSelectBox([], this.moaClassName, '')
        + '             </div>'
        + '         </div>'
        + '     </div>'
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

    $(document).on('change', '.'+ this.moaDivisionName, function(){
      Obrs.APP.updateBusinessGroupSelect(
          $(this).val(),
          self._getElementByClass(self.moaGroupName)
      );

      // Obrs.APP.makeSelectBoxEmpty(self._getUpazilaElement());

      // self._clearUpazilaSelect();
    });

    $(document).on('change', '.'+ this.moaGroupName, function(){
      Obrs.APP.updateBusinessClassSelect(
          $(this).val(),
          self._getElementByClass(self.moaClassName)
      );
    });

    $(document).on('change', '.'+ this.moaClassName, function(){
      Obrs.APP.updateBusinessSubClassSelect(
          $(this).val(),
          self._getElementByClass(self.moaSubClassName)
      );
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