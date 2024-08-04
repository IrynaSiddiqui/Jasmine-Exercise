describe('Payments testing each function', function(){
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });

    it('should add new payment on submitPaymentInfo()', function (){
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
        
    });

    it('should not add empty input on submitPaymentInfo()', function(){
        billAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should update payment on appendPaymentTable()', function(){
        let payment = createCurPayment();
        allPayments['payment1'] = payment;

        appendPaymentTable(payment);

        let tdList = document.querySelectorAll('#paymentTable tbody tr td');

        expect(tdList.length).toEqual(3);
        expect(tdList[0].innerText).toEqual('$100');
        expect(tdList[1].innerText).toEqual('$20');
        expect(tdList[2].innerText).toEqual('20%');
        

    });

    it('should create new payment', function(){
        let payment = {
            billAmt: '100',
            tipAmt: '20',
            tipPercent: 20
        }

        expect(createCurPayment()).toEqual(payment);
    });

    it('should not create empty input on createCurPayment()', function(){
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let payment = createCurPayment();

        expect(payment).toEqual(undefined);
    });


afterEach(function(){
    billAmtInput.value = '';
    tipAmtInput.value = '';
    allPayments = {};
    paymentTbody.innerHTML = '';
    serverTbody.innerHTML = '';
    paymentId = 0;
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
})
});