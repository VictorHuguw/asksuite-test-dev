const puppeteer = require('puppeteer');

// importacao de duas funcoes auxiliarem para conversao de datas
const { getDateParts, getTodayAtMidnight } = require('../utils/getDateParts');
class BrowserService {

    static async getBrowser(req, res) {

        try {

            const { checkin, checkout } = req.body

            // Pegar apenas o ano, mes e dia separados das datas fornecidas
            const dateCheckin = getDateParts(checkin)
            const dateCheckout = getDateParts(checkout)

            // Verifica se as datas sao validas
            const dateValid = await BrowserService.validDate(dateCheckin, dateCheckout)

            if (dateValid.result) {

                const browser = await puppeteer.launch({ headless: false })
                const page = await browser.newPage()
                await page.setViewport({ width: 1920, height: 1080 });
                await page.goto(`https://pratagy.letsbook.com.br/D/Reserva?checkin=${dateCheckin.day}%2F${dateCheckin.month}%2F${dateCheckin.year}&checkout=${dateCheckout.day}%2F${dateCheckout.month}%2F${dateCheckout.year}&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=8%2F14%9F2022`)

                // Arrays contendo as informações necessarias pera gerar o json
                const roomNames = await BrowserService.getInfo(page, '.tdQuarto .flex-table .flex-table-row .quartoNome')
                const roomDescriptions = await BrowserService.getInfo(page, '.tdQuarto .flex-table .quartoContent .wrap-descricao .quartoDescricao > p')
                const roomPrices = await BrowserService.getInfo(page, 'span.valorFinal.valorFinalDiscounted')
                const roomImgs = await BrowserService.getRoomImgs(page,)

                // Gerando o array final contendo os resultados encontrados na tela
                const result = roomNames.map((name, index) => ({
                    name,
                    description: roomDescriptions[index],
                    price: roomPrices[index],
                    image: roomImgs[index],
                }));

                await BrowserService.closeBrowser(browser)

                res.status(200).send(result)

            } else {

                res.status(200).send({ status: 200, message: dateValid.message })

            }

        } catch (error) {

            console.log(error.message)

        }

    }

    /**
     * 
     * @param {*} page 
     * @param {*} content 
     * 
     * Como os dados como nome, descricao e precos sao pegos de forma semelhates foi criando essa funcao para 
     * isolar e retuilizar o mesmo bloco de codigo passando os parametros de page e conteudo do seletor
     *  
     */
    static async getInfo(page, content) {

        const result = await page.$$eval(content,
            info => info.map(
                result => result.textContent
            ))

        return result

    }

    /**
     * 
     * @param {*} page 
     * 
     * Função responsavel por extrair todas as imagens encontradas
     * 
     */
    static async getRoomImgs(page) {

        const roomImgs = await page.$$eval('li.slick-slide.slick-current.slick-active',
            romsImgs => romsImgs.map(
                romsDescription => {
                    const backgroundImageStyle = window.getComputedStyle(romsDescription).getPropertyValue('background-image');
                    const urlRegex = /url\(['"]?(.*?)['"]?\)/;
                    const match = backgroundImageStyle.match(urlRegex);
                    return match ? match[1] : null;
                }
            ).filter(url => url !== null)
        );

        return roomImgs

    }

    static async closeBrowser(browser) {

        if (!browser) {
            return;
        }

        return browser.close();

    }

    /**
     * 
     * @param {*} dateCheckin 
     * @param {*} dateCheckout 
     * 
     * Função responsavel por fazer a validação das datas inseridas
     * 
     * 1 - Valida se a data de checkout é maior que a data de checkin
     * 2 - Valida se a data de checkin fornecida nao é uma data anterior ao dia de hoje 
     * 3 - Verifica se existe uma diferenca de 3 dias pois o site so permite checkin com no minimo de 3 noites
     * 
     */
    static async validDate(dateCheckin, dateCheckout) {

        let date1 = new Date(dateCheckin.year, dateCheckin.month - 1, dateCheckin.day).toISOString();
        let date2 = new Date(dateCheckout.year, dateCheckout.month - 1, dateCheckout.day).toISOString();

        let newDateCheckin = new Date(date1);
        let newDateCheckout = new Date(date2);

        if (newDateCheckout >= newDateCheckin) {

            const today = getTodayAtMidnight()

            if (newDateCheckin >= today) {

                const differenceInMilliseconds = Math.abs(newDateCheckout - newDateCheckin);

                const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 

                if (differenceInMilliseconds >= 3 * oneDayInMilliseconds) {

                    return { result: true, message: "Valid Dates" }

                } else {

                    return { result: false, message: 'For you to check in, you must stay at least 3 night(s)' }

                }

            } else {

                return { result: false, message: "Checkin date cannot be less than today" }

            }

        } else {

            return { result: false, message: "Checkout date must be greater than checkin date" }

        }

    }


}

module.exports = BrowserService;