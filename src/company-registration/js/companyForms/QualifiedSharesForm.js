class QualifiedSharesForm extends BaseForm {
    header = '';
    subHeader = '';
    formClassName = 'qualifiedSharesForm';

    constructor(header, subHeader) {
        super();
        console.log("SMNLOG :: Constructor : qualifiedSharesForm");
        this.header = header;
        this.subHeader = subHeader;
    }

    getFormData() {
        return '';
    }

    getFormHtml() {
        var self = this;
        let html = '<div class="rounded border border-color d-flex flex-column ' + this.formClassName + '">'
        html += super.getStepFormHeader(this.header);

        html += '    <div class="row p-4">'
            + '         <div class="col-md-6 offset-md-3">'
            + '             <div class="d-flex flex-column mb-4">'
            + '                 <label class="form-label font-label">1. Number of Qualified Shares <span class="red">*</span></label>'
            + '                 <input type="text" class="plc reg-form-input form-control"/>'
            + '             </div>'
            + '         </div>'
            + '         <div class="col-md-6 offset-md-3">'
            + '             <div class="d-flex flex-column mb-4">'
            + '                 <label class="form-label font-label">2. Value of each Share (BDT) <span class="red">*</span></label>'
            + '                 <input type="text" class="plc reg-form-input form-control"/>'
            + '             </div>'
            + '         </div>'
            + '     </div>'
            + '</div>';

        return html;
    }

    bindEvents() {
        var self = this;

    }

    _getBaseElementForThisForm() {
        return $(document).find('div.' + this.formClassName);
    }

    _getDistrictElement() {
        return this._getBaseElementForThisForm().find('select.' + this.districtSelectBoxClassName);
    }

    _getUpazilaElement() {
        return this._getBaseElementForThisForm().find('select.' + this.upazilaSelectBoxClassName);
    }

    getEmptyJsonData() {
        return {}
    }
}