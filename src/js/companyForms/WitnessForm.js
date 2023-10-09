class WitnessForm extends BaseForm {
    aoaList = [];
    header = '';
    subHeader = '';
    formClassName = 'witnessForm';

    constructor(header, subHeader) {
        super();
        console.log("SMNLOG :: Constructor : witnessForm");
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

        html += '    <div class="row col-md-12 p-4">'
            + '         <div class="col-md-2"></div>'
            + '         <div class="row col-md-4">'
            + '                 <div class="col-md-12 mb-4">'
            + '                     <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
            + '                         <span class="all-label">Witness 01</span>'
            + '                     </div>'
            + '                  </div>'
            + '         <div class="col-md-12">'
            + '             <div class="d-flex flex-column w-100 mb-4">'
            + '                 <label class="form-label font-label">1. National ID<span class="red">*</span></label>'
            + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type your National ID"/>'
            + '             </div>'
            + '         </div>'
            + '         <div class="col-md-12">'
            + '             <div class="d-flex flex-column w-100 mb-4">'
            + '                 <label class="form-label font-label">2. Witness Name<span class="red">*</span></label>'
            + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type your name"/>'
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

            + '         </div>'
            + '         <div class="col-md-1"></div>'
            + '         <div class="row col-md-4">'
            + '                 <div class="col-md-12 mb-4">'
            + '                     <div class="d-flex gray-bg p-2 w-100 justify-content-between">'
            + '                         <span class="all-label">Witness 02</span>'
            + '                     </div>'
            + '                  </div>'
            + '         <div class="col-md-12">'
            + '             <div class="d-flex flex-column w-100 mb-4">'
            + '                 <label class="form-label font-label">1. National ID<span class="red">*</span></label>'
            + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type your National ID"/>'
            + '             </div>'
            + '         </div>'
            + '         <div class="col-md-12">'
            + '             <div class="d-flex flex-column w-100 mb-4">'
            + '                 <label class="form-label font-label">2. Witness Name<span class="red">*</span></label>'
            + '                 <input type="text" class="plc reg-form-input form-control" aria-describedby="emailHelp" placeholder="Type your name"/>'
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

            + '         </div>'


            + '     </div>'
            + '</div>';

        return html;
    }

    bindEvents() {
        var self = this;

        ClassicEditor.create(document.querySelector(".editor"))
            .then((editor) => {
                console.log(editor);
            })
            .catch((error) => {
                console.error(error);
            });

        $(document).on('click', '.aoaClauseEditBtn', function () {
            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.viewPanel')
                .hide()

            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.editorPanel')
                .show()
        });

        $(document).on('click', '.updateAoaClauseBtn', function () {
            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.viewPanel')
                .show()

            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.editorPanel')
                .hide()
        });
    }

    _createCommentSection(idx, obj, isDefault) {
        let html = '  <div class="row p-4 pt-2 pb-1 aoaClauseWrapper">'
            + '          <div class="col-md-12">'
            + '             <div class="main-body-color custom-radius flex-column px-4 py-1 border-color viewPanel" style="display: '+ (isDefault === true ? "none": "block") +'">'
            + '                <div class="d-flex justify-content-between">'
            + '                  <div class="d-flex font-weight-bold">' + idx + ' ' + obj.title + '</div>'
            + '                  <div class="d-flex">'
            + '                      <button type="button" class="btn bg-white py-2 px-3 text-primary shadow d-flex gap-2 align-items-center aoaClauseEditBtn">'
            + '                        <i class="fa-solid fa-pen-to-square" style="color: #1952f4"></i>Edit'
            + '                      </button>'
            + '                  </div>'
            + '                </div>'
            + '                <div class="d-flex">' + obj.aoaClause + '</div>'
            + '            </div>'
            + '            <div class="flex-column light-blue-background custom-radius p-3 editorPanel" style="display: '+ (isDefault === false ?  "none": "block") +'">'
            + '                 <div class="font-weight-bold">Choose clause</div>'
            + '                 <input type="text" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Disassembly and Recycling"/>'
            + '                 <div class="mb-3 editor">This is some sample content.</div>'
            + '                 <div class="d-flex justify-content-end mt-4">'
            + '                    <button type="button" class="btn btn-primary updateAoaClauseBtn">Update clause</button>'
            + '                 </div>'
            + '           </div>'

            + '        </div>'
            + '      </div>'
        return html;
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