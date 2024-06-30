export class EmailRequest {
    mensagem: string;

    constructor(mensagem?: string) {
        this.mensagem = mensagem || '';
    }
}