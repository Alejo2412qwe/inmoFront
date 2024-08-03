import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { USER } from 'src/app/common/img64';
import { Usuario } from 'src/app/models/usuario';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {



  constructor(private UsuarioService: UsuarioService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,) { }

  page1!: number;
  page2!: number;

  listaUsuarios: Usuario[] = []

  estList: number = 1;
  userImg = USER

  isLoading: boolean = true;

  selectedInq!: number;
  selectedProp!: number;

  searchString: string = '';
  valorInicial!: string;
  pagamento!: string;
  diaPagamento!: string;
  plazo!: string;
  caucao!: string;
  cidade!: string;
  tipo!: string;
  matricula!: string;
  unidade!: string;
  finalidade!: string;
  endereco!: string;
  temIptu: boolean = false;
  valorIptu!: string;

  rol: string = this.sessionStorage.getItem('rol') || '';
  userId: number = this.sessionStorage.getItem('userId') || 0;

  tipoRes: { name: string, value: number }[] = [
    { name: 'Casa', value: 1 },
    { name: 'Apartamento', value: 2 },
    { name: 'Sobrado', value: 3 },
  ];

  cidadesParana: { name: string, value: number }[] = [
    { name: 'Curitiba', value: 1 },
    { name: 'Londrina', value: 2 },
    { name: 'Maringá', value: 3 },
    { name: 'Ponta Grossa', value: 4 },
    { name: 'Cascavel', value: 5 },
    { name: 'São José dos Pinhais', value: 6 },
    { name: 'Foz do Iguaçu', value: 7 },
    { name: 'Colombo', value: 8 },
    { name: 'Guarapuava', value: 9 },
    { name: 'Paranaguá', value: 10 },
    { name: 'Araucária', value: 11 },
    { name: 'Toledo', value: 12 },
    { name: 'Apucarana', value: 13 },
    { name: 'Pinhais', value: 14 },
    { name: 'Campo Largo', value: 15 },
    { name: 'Arapongas', value: 16 },
    { name: 'Almirante Tamandaré', value: 17 },
    { name: 'Piraquara', value: 18 },
    { name: 'Umuarama', value: 19 },
    { name: 'Sarandi', value: 20 },
    { name: 'Francisco Beltrão', value: 21 },
    { name: 'Cianorte', value: 22 },
    { name: 'Castro', value: 23 },
    { name: 'Cambé', value: 24 },
    { name: 'Rolândia', value: 25 },
    { name: 'Telêmaco Borba', value: 26 },
    { name: 'Pato Branco', value: 27 },
    { name: 'Paranavaí', value: 28 },
    { name: 'Mandaguari', value: 29 },
    { name: 'Palmas', value: 30 },
    { name: 'Marechal Cândido Rondon', value: 31 },
    { name: 'Assis Chateaubriand', value: 32 },
    { name: 'Cornélio Procópio', value: 33 },
    { name: 'Irati', value: 34 },
    { name: 'Ibiporã', value: 35 },
    { name: 'Santo Antônio da Platina', value: 36 },
    { name: 'Jacarezinho', value: 37 },
    { name: 'Dois Vizinhos', value: 38 },
    { name: 'Jaguariaíva', value: 39 },
    { name: 'Lapa', value: 40 },
    { name: 'Pitanga', value: 41 },
    { name: 'União da Vitória', value: 42 },
    { name: 'Realeza', value: 43 },
    { name: 'Siqueira Campos', value: 44 },
    { name: 'Wenceslau Braz', value: 45 },
    { name: 'Ibaiti', value: 46 },
    { name: 'Ampére', value: 47 },
    { name: 'Palmeira', value: 48 },
    { name: 'Jandaia do Sul', value: 49 },
    { name: 'Quedas do Iguaçu', value: 50 },
    { name: 'Rio Negro', value: 51 },
    { name: 'Faxinal', value: 52 },
    { name: 'Matinhos', value: 53 },
    { name: 'Mallet', value: 54 },
    { name: 'Guaratuba', value: 55 },
    { name: 'Nova Londrina', value: 56 },
    { name: 'Ivaiporã', value: 57 },
    { name: 'Reserva', value: 58 },
    { name: 'Sengés', value: 59 },
    { name: 'Sertanópolis', value: 60 },
    { name: 'Engenheiro Beltrão', value: 61 },
    { name: 'Colorado', value: 62 },
    { name: 'São Mateus do Sul', value: 63 },
    { name: 'General Carneiro', value: 64 },
    { name: 'Santa Helena', value: 65 },
    { name: 'Carlópolis', value: 66 },
    { name: 'Peabiru', value: 67 },
    { name: 'Ribeirão do Pinhal', value: 68 },
    { name: 'Tomazina', value: 69 },
    { name: 'Imbituva', value: 70 },
    { name: 'Ubiratã', value: 71 },
    { name: 'Vitorino', value: 72 },
    { name: 'Mandirituba', value: 73 },
    { name: 'Mangueirinha', value: 74 },
    { name: 'Ivaí', value: 75 },
    { name: 'Marialva', value: 76 },
    { name: 'Goioerê', value: 77 },
    { name: 'Diamante do Norte', value: 78 },
    { name: 'Clevelândia', value: 79 },
    { name: 'Bituruna', value: 80 },
    { name: 'Cândido de Abreu', value: 81 },
    { name: 'Sertaneja', value: 82 },
    { name: 'Nova Esperança', value: 83 },
    { name: 'Rondon', value: 84 },
    { name: 'Roncador', value: 85 },
    { name: 'Mamborê', value: 86 },
    { name: 'Palotina', value: 87 },
    { name: 'Iporã', value: 88 },
    { name: 'Altônia', value: 89 },
    { name: 'Terra Roxa', value: 90 },
    { name: 'Japurá', value: 91 },
    { name: 'Astorga', value: 92 },
    { name: 'Tapejara', value: 93 },
    { name: 'Santo Inácio', value: 94 },
    { name: 'Perobal', value: 95 },
    { name: 'Lobato', value: 96 },
    { name: 'Santa Tereza do Oeste', value: 97 },
    { name: 'Coronel Vivida', value: 98 },
    { name: 'Três Barras do Paraná', value: 99 },
    { name: 'Santa Isabel do Ivaí', value: 100 },
    { name: 'Fazenda Rio Grande', value: 101 }
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.loadUsers(1)
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  loadUsers(est: number) {
    if (est === 0 || est === 1 && this.rol == 'Administrador') {
      this.UsuarioService.allUsersData(est).subscribe((response) => {
        this.listaUsuarios = response;
      });
    } else if (est === 0 || est === 1 && this.rol == 'Propietario') {
      this.UsuarioService.getUsersByRol(4, 1).subscribe((data) => {
        this.listaUsuarios = data;
      });
    }
  }

  searchUser(search: string, est: number) {
    this.UsuarioService.searchUsersData(search, est).subscribe((response) => {
      this.listaUsuarios = response;

    });
  }

  selectPessoa(id: number, rol: number) {
    if (rol == 3) {
      this.selectedProp = id;
      if (this.selectedProp) {
        this.toastr.success("Propietario corretamente selecionado");
      } else {
        this.toastr.error("Erro ao obter o propietario desejado");
      }
    } else {
      this.selectedInq = id;
      if (this.selectedInq) {
        this.toastr.success("Inquilino corretamente selecionado");
      } else {
        this.toastr.error("Erro ao obter o locatário desejado");
      }
    }
  }

  validarContrato(): boolean {

    if (!this.selectedInq) {
      this.toastr.error("Selecione um inquilino");
      return false;
    }

    if (!this.selectedProp) {
      this.toastr.error("Selecione um propietario");
      return false;
    }

    if (!this.valorInicial) {
      this.toastr.error("Digite o valor inicial");
      return false;
    }

    if (!this.pagamento) {
      this.toastr.error("Digite o pagamento");
      return false;
    }

    if (!this.plazo) {
      this.toastr.error("Digite o plazo");
      return false;
    }

    if (!this.caucao) {
      this.toastr.error("Selecione o caução");
      return false;
    }

    if (!this.selectedProp) {
      this.toastr.error("Selecione um propietario");
      return false;
    }

    if (!this.cidade) {
      this.toastr.error("Selecione uma cidade");
      return false;
    }

    if (!this.tipo) {
      this.toastr.error("Selecione um tipo");
      return false;
    }

    if (!this.matricula) {
      this.toastr.error("Digite uma matricula");
      return false;
    }

    if (!this.unidade) {
      this.toastr.error("Digite uma unidade");
      return false;
    }

    return true;
  }

  criarContrato() {
    if (this.rol == 'Propietario') {
      this.selectedProp = this.userId;
    }

    if (this.validarContrato()) {
      this.UsuarioService.searchUsersId(this.selectedInq).subscribe((inq) => {
        if (inq) {
          this.UsuarioService.searchUsersId(this.selectedProp).subscribe((prop) => {
            if (prop) {
              //começa
              const doc = new jsPDF();
              doc.setFont('tahoma');
              doc.setFontSize(14);
              const imageUrl = 'assets/imgs/inmoLOGO.jpeg';
              doc.addImage(imageUrl, 'JPEG', 97, 0, 20, 20);

              const pageWidth = doc.internal.pageSize.getWidth();
              const maxLineWidth = pageWidth - 20;

              //texto1
              const text = 'INSTRUMENTO PARTICULAR DE CONTRATO DE LOCAÇÃO COM CAUÇÃO DE IMOVEL RESIDENCIAL';
              const lines = doc.splitTextToSize(text, maxLineWidth);
              lines.forEach((line: any, index: any) => {
                const textWidth = doc.getTextWidth(line);
                const textX = (pageWidth - textWidth) / 2;
                const textY = 31 + (index * 7);
                doc.text(line, textX, textY);

                // Dibujar una línea para subrayar el texto
                doc.line(textX, textY + 1, textX + textWidth, textY + 1);
              });


              //texto2
              const text2 = 'Por este instrumento particular de contrato de locação de imóvel para fins residenciais e com fundamento na Lei nº 8.245/91, o LOCADOR dá em locação ao LOCATÁRIO o imóvel abaixo individuado mediante as seguintes cláusulas e condições. '
              const lines2 = doc.splitTextToSize(text2, maxLineWidth);
              lines2.forEach((line: any, index: any) => {
                const textWidth = doc.getTextWidth(line);
                const textX = (pageWidth - textWidth) / 2;
                const textY = 50 + (index * 7);
                doc.text(line, textX, textY);
              });

              const rectWidth = pageWidth - 20; // Ancho del rectángulo
              const rectHeight = 10; // Alto del rectángulo

              doc.rect(10, 70, rectWidth, rectHeight);
              doc.rect(10, 80, rectWidth, 40);
              doc.rect(10, 120, rectWidth, rectHeight);
              doc.rect(10, 130, rectWidth, 50);
              doc.rect(10, 180, rectWidth, 45);

              doc.text("LOCADORES:", 11, 75)

              doc.text("Nome: " + prop.usuPerId.perNombre + ' ' + prop.usuPerId.perApellido, 11, 85)
              doc.text("CPF (MF): " + prop.usuPerId.perCedula, 11, 92)
              doc.text("Nacionalidade: " + prop.usuPerId.perNacionalidade, 11, 99)
              doc.text("RG: " + prop.usuPerId.perRG, 11, 106)
              doc.text("Estado Civil: " + prop.usuPerId.perEstadoCivil, 11, 113)

              doc.text("LOCATÁRIO:", 11, 125)

              doc.text("Nome: " + inq.usuPerId.perNombre + ' ' + inq.usuPerId.perApellido, 11, 135)
              doc.text("CPF (MF): " + inq.usuPerId.perCedula, 11, 142)
              doc.text("Nacionalidade: " + inq.usuPerId.perNacionalidade, 11, 149)
              doc.text("RG: " + inq.usuPerId.perRG, 11, 156)
              doc.text("Estado Civil: " + inq.usuPerId.perEstadoCivil, 11, 162)
              doc.text("E-mail: " + inq.usuCorreo, 11, 169)
              doc.text("Telefone: " + inq.usuPerId.perTelefono, 11, 176)

              doc.text("IMOBILIÁRIA INTERMEDIADORA: ", 11, 187)
              doc.text("Nome: IMÓVEIS PORTAL CIC", 11, 194)
              doc.text("CNPJ/MF: 23.849.230/0001-25", 11, 201)
              doc.text("CRECI/PR: J5849", 11, 208)
              doc.text("Endereço: Rua Engenheiro Afonso Nadolny, 1231, CIC - Curitiba - PR", 11, 215)

              doc.text('1', 195, 290);
              doc.addPage();

              doc.addImage(imageUrl, 'JPEG', 97, 0, 20, 20);

              doc.text("DADOS DO IMÓVEL LOCADO: ", 11, 20)

              doc.rect(11, 25, 50, 20);
              doc.rect(61, 25, 138, 20);
              doc.text("Descrição:", 15, 30)
              doc.text(this.tipo, 65, 30)
              doc.text("Matricula: " + this.matricula, 65, 40)
              doc.text("Unidade Consumidora: " + this.unidade, 125, 40)

              const rectWidth2 = pageWidth - 22;
              doc.rect(11, 45, rectWidth2, 20);
              doc.text("Endereço: " + this.endereco, 15, 52)

              doc.rect(11, 65, 50, 20);
              doc.text("Finalidade:", 15, 70)

              doc.rect(61, 65, 138, 20);
              doc.text(this.finalidade, 65, 75)


              const text3 = 'VIGÊNCIA: 12 (Doze) meses podendo ser prorrogada por mais 12 (Doze) meses caso ambos queiram dar continuidade com aviso antecipado de no mínimo 30 dias antes do vencimento';
              const lines3 = doc.splitTextToSize(text3, maxLineWidth);
              lines3.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 100 + (index * 7);
                doc.text(line, textX, textY);
              });

              let fecha: any = new Date();

              let dia: number = fecha.getDate();
              let mes: number = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo tanto sumamos 1
              let anio: number = fecha.getFullYear();

              // Formatear día y mes a dos dígitos si es necesario
              let diaStr: string = ('0' + dia).slice(-2); // Agrega un cero a la izquierda si es necesario
              let mesStr: string = ('0' + mes).slice(-2); // Agrega un cero a la izquierda si es necesario

              // Crear la cadena con el formato deseado
              let fechaFormateada: string = diaStr + '/' + mesStr + '/' + anio;


              doc.rect(11, 110, 50, 20);
              doc.text("Inicio: " + fechaFormateada, 15, 121);

              doc.rect(61, 110, 138, 20);
              doc.text("Vencimento do locativo: Todo dia " + dia + " do mês subsequente.", 65, 121);

              doc.rect(11, 130, 188, 20);

              let text4!: string;
              if (this.temIptu) {
                text4 = 'Valor do aluguel inicial: R$ ' + this.valorInicial + ', para pagamento em dia  R$ ' + this.pagamento + ' + R$ ' + this.valorIptu + 'do IPTU, mais despesas de consumo individual: Luz e Água. Ficando exclusivamente por conta do LOCATÁRIO, durante toda a vigência do contrato.'
              } else {
                text4 = 'Valor do aluguel inicial: R$ ' + this.valorInicial + ', para pagamento em dia  R$ ' + this.pagamento + ', mais despesas de consumo individual: Luz e Água. Ficando exclusivamente por conta do LOCATÁRIO, durante toda a vigência do contrato.'
              }

              const lines4 = doc.splitTextToSize(text4, maxLineWidth);
              lines4.forEach((line: any, index: any) => {
                const textX = 14;
                const textY = 135 + (index * 6);
                doc.text(line, textX, textY);
              });

              let textito;
              if (parseInt(this.plazo) == 6) {
                textito = 'Semestral';
              } else if (parseInt(this.plazo) == 12) {
                textito = 'Anual';
              }
              doc.rect(11, 150, 50, 10);
              doc.text("Reajuste: " + textito, 15, 157);

              doc.rect(61, 150, 138, 10);
              doc.text("Índice: IGPM", 65, 157);

              const text5 = 'CLÁUSULA PRIMEIRA: Conforme consta acima, a presente locação é celebrada pelo prazo determinado de 12 (Doze) meses podendo ser prorrogado por mais ' + this.plazo + ' meses caso ambos queriam dar continuidade com aviso antecipado de no mínimo 30 dias antes do vencimento após, data em que o LOCATÁRIO se obriga a restituir o imóvel totalmente desocupado de pessoas e coisas e no estado em que locou.'
              const lines5 = doc.splitTextToSize(text5, maxLineWidth);
              lines5.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 170 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text6 = 'CLÁUSULA SEGUNDA: O LOCATÁRIO se obriga a manter e devolver o imóvel, ao final da locação, como recebeu e às próprias custas, de forma a restituí-lo na mais perfeita ordem e no mesmo estado de conservação, higiene e perfeito funcionamento quando findo ou rescindido este contrato, de modo que possa ser imediatamente ocupado, sem que isso dependa de qualquer conserto, reparo ou pintura, ocasião em que será efetuada vistoria para fins de entrega do imóvel.'
              const lines6 = doc.splitTextToSize(text6, maxLineWidth);
              lines6.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 205 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text7 = 'CLÁUSULA TERCEIRA: É vedada a sublocação do imóvel ou cessão do presente contrato, salvo se com a aquiescência formal e escrita do LOCADOR.'
              const lines7 = doc.splitTextToSize(text7, maxLineWidth);
              lines7.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 245 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text8 = 'CLÁUSULA QUARTA: Os aluguéis mensais deverão ser pagos até o dia ' + this.diaPagamento + ' do mês subsequente mediante pagamento junto à IMOBILIÁRIA INTERMEDIADORA, na Conta para Depósito Portal CIC assessoria imobiliária LTDA. Conta Caixa Econômica Federal Agência 4744 Conta 692-1, para transferência via PIX usar CNPJ 23.849.230/0001-25, mediante recibo de aluguel. Com o pagamento, o LOCATÁRIO deverá enviar os comprovantes de pagamento Aluguel, água, luz e despesas condominiais, ao número de telefone (41) 9 9777-5496'
              const lines8 = doc.splitTextToSize(text8, maxLineWidth);
              lines8.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 260 + (index * 6);
                doc.text(line, textX, textY);
              });

              doc.text('2', 195, 290);
              doc.addPage();

              doc.addImage(imageUrl, 'JPEG', 97, 0, 20, 20);

              const text9 = 'CLÁUSULA QUINTA: Na hipótese da locação não abranger a totalidade do mês o valor locativo será pago de forma proporcional.'
              const lines9 = doc.splitTextToSize(text9, maxLineWidth);
              lines9.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 25 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text10 = 'CLÁUSULA SEXTA: Havendo mora no pagamento dos locativos será devida uma multa de 10% (dez por cento) sobre o total devido, mais juros moratórios de 2% (dois por cento) ao mês ou fração e correção pela IGPM/FGV.'
              const lines10 = doc.splitTextToSize(text10, maxLineWidth);
              lines10.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 40 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text11 = 'CLÁUSULA SÉTIMA: O aluguel mensal inicial, de R$ ' + this.valorInicial + ' será reajustado em 12 (Doze) meses com base na variação positiva do IGPM/FGV ou outro índice que venha a substituí-lo, ou, ainda, se houver concordância das partes, por outro índice estipulado oportunamente.'
              const lines11 = doc.splitTextToSize(text11, maxLineWidth);
              lines11.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 60 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text12 = 'CLÁUSULA OITAVA: O presente contrato de locação poderá ser rescindido antes de transcorrido o prazo ajustado nas seguintes hipóteses:'
              const lines12 = doc.splitTextToSize(text12, maxLineWidth);
              lines12.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 85 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text13 = 'a) Por iniciativa imotivada do LOCATÁRIO antes do término da vigência mediante o pagamento do equivalente a um (02) meses de aluguel;'
              const lines13 = doc.splitTextToSize(text13, maxLineWidth);
              lines13.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 100 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text14 = 'b) Por mútuo acordo das partes, independentemente da cobrança de multa a qualquer título ou conforme o que for pactuado;'
              const lines14 = doc.splitTextToSize(text14, maxLineWidth);
              lines14.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 115 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text15 = 'c) Por iniciativa de qualquer das partes se ocorrer alguma das hipóteses previstas na Lei 8.245/91, caso em que será ou não devida multa ou indenização em conformidade com a referida lei.'
              const lines15 = doc.splitTextToSize(text15, maxLineWidth);
              lines15.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 130 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text16 = 'd) Atrasos de Água e Luz, importunação de sossego após às 22:00 ou festas com som alto após às 22:00 e aglomeração devido a pandemia; Lei n°10625: 1º É proibido perturbar o sossego e o bem estar público com sons, ruídos e vibrações que causem incômodo de qualquer natureza ou que ultrapassem os limites fixados nesta lei. ... II - RUÍDO: som capaz de causar perturbação ao sossego público ou efeitos psicológicos e fisiológicos negativos em seres humanos e animais. DECRETO n.º 960/2021 - Dispõe sobre medidas restritivas a atividades e serviços para o enfrentamento da Emergência em Saúde Pública, de acordo com o quadro epidêmico do novo Coronavírus (COVID-19'
              const lines16 = doc.splitTextToSize(text16, maxLineWidth);
              lines16.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 150 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text17 = 'e) Após 15 DIAS DE ATRASO do pagamento do aluguel, irá gerar quebra de contrato, atrasos de água e luz com atrasos de mais de 30 dias também podem haver quebra de contrato, por parte da intermediária.'
              const lines17 = doc.splitTextToSize(text17, maxLineWidth);
              lines17.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 200 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text18 = 'CLÁUSULA NONA: Quaisquer tolerâncias ou concessões feitas pelo LOCADOR não implicará em novação nem em alterações do conteúdo deste instrumento, que permanecerá íntegro.'
              const lines18 = doc.splitTextToSize(text18, maxLineWidth);
              lines18.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 220 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text19 = 'CLÁUSULA DÉCIMA: Eventuais danos verificados no imóvel e moveis especificados abaixo deverão ser reparados pelo LOCATÁRIO ou indenizados ao final do contrato mediante orçamento prévio e à parte, não estando inclusos na multa prevista neste contrato.'
              const lines19 = doc.splitTextToSize(text19, maxLineWidth);
              lines19.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 240 + (index * 6);
                doc.text(line, textX, textY);
              });

              doc.text('3', 195, 290);
              doc.addPage();

              doc.addImage(imageUrl, 'JPEG', 97, 0, 20, 20);

              const text20 = 'CLÁUSULA DÉCIMA PRIMEIRA: No vencimento do prazo deste contrato o LOCATÁRIO compromete-se a devolver o imóvel nas mesmas condições que o recebeu, independente de notificação, interpelação ou aviso.'
              const lines20 = doc.splitTextToSize(text20, maxLineWidth);
              lines20.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 25 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text21 = 'CLÁUSULA DÉCIMA SEGUNDA: O LOCATÁRIO não poderá reter o pagamento do aluguel e dos demais acessórios da locação por eventual não atendimento às suas reclamações/exigências.'
              const lines21 = doc.splitTextToSize(text21, maxLineWidth);
              lines21.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 45 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text22 = 'CLÁUSULA DÉCIMA TERCEIRA: O LOCATÁRIO ainda fica obrigado a:'
              const lines22 = doc.splitTextToSize(text22, maxLineWidth);
              lines22.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 65 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text23 = 'a) Pagar as despesas de consumo de energia elétrica, gás encanado e quaisquer outros serviços contratados ou utilizados, observando-se quanto à taxa de condomínio no preâmbulo e na cláusula quarta;'
              const lines23 = doc.splitTextToSize(text23, maxLineWidth);
              lines23.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 75 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text24 = 'b) Entregar eventuais correspondências destinadas ao LOCADOR e recebidas no endereço do imóvel locado, no prazo máximo de 05 (cinco) dias a contar à data que as recebeu;'
              const lines24 = doc.splitTextToSize(text24, maxLineWidth);
              lines24.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 95 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text25 = 'c) Custear os reparos e consertos que se fizerem necessários no imóvel locado em razão dos estragos a que der causa ou causados por seus empregados ou visitantes;'
              const lines25 = doc.splitTextToSize(text25, maxLineWidth);
              lines25.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 110 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text26 = 'd) Cumprir todas as exigências da Saúde Pública Municipal e Estadual, bem como responder por infrações às regras do condomínio a que tenha dado causa;'
              const lines26 = doc.splitTextToSize(text26, maxLineWidth);
              lines26.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 125 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text27 = 'e) Restituir, independentemente de notificação ou aviso, o imóvel locado em perfeito estado de conservação e limpeza, e com a comprovação da quitação dos encargos que lhes são atribuídos assim que vencido o prazo de duração do contrato, caso não seja o mesmo renovado;'
              const lines27 = doc.splitTextToSize(text27, maxLineWidth);
              lines27.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 140 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text28 = 'f) Pintar o imóvel da mesma forma que o recebeu quando da entrega, caso necessário a critério do LOCADOR;'
              const lines28 = doc.splitTextToSize(text28, maxLineWidth);
              lines28.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 160 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text29 = 'g) Quando do pagamento dos aluguéis mensais, até a data de vencimento deste, apresentar, devidamente quitados, os comprovantes da energia elétrica e água, além de pagar os dias que excederem ao último vencimento;'
              const lines29 = doc.splitTextToSize(text29, maxLineWidth);
              lines29.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 175 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text30 = 'h) Permitir que ao LOCADOR, a qualquer tempo e mediante aviso, por si ou por terceiro autorizado, vistorie o imóvel locado sempre que achar necessário.'
              const lines30 = doc.splitTextToSize(text30, maxLineWidth);
              lines30.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 195 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text31 = 'CLÁUSULA DÉCIMA QUARTA: O LOCATÁRIO compromete-se a respeitar os direitos da vizinhança, nos termos do Código Civil, bem com a convenção de condomínio e regimento interno correspondentes, respondendo diretamente ou em regresso perante o LOCADOR.'
              const lines31 = doc.splitTextToSize(text31, maxLineWidth);
              lines31.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 210 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text32 = 'CLÁUSULA DÉCIMA QUINTA: A mera entrega das chaves ao LOCADOR não desobriga o LOCATÁRIO dos compromissos assumidos no presente contrato sem que seja dada plena e geral quitação por escrito.'
              const lines32 = doc.splitTextToSize(text32, maxLineWidth);
              lines32.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 230 + (index * 6);
                doc.text(line, textX, textY);
              });


              const text33 = 'CLÁUSULA DÉCIMA SEXTA: O LOCADOR poderá recusar o recebimento das chaves no caso de o imóvel não estar em perfeitas condições, da mesma forma como foi entregue ao LOCATÁRIO no início da locação, até que sejam efetuados os reparos necessários, salientando-se que durante esse período o pagamento dos aluguéis e demais encargos da locação continuarão sendo de inteira responsabilidade do LOCATÁRIO, independentemente de estar ou não ocupando o imóvel.'
              const lines33 = doc.splitTextToSize(text33, maxLineWidth);
              lines33.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 250 + (index * 6);
                doc.text(line, textX, textY);
              });

              doc.text('4', 195, 290);
              doc.addPage();

              doc.addImage(imageUrl, 'JPEG', 97, 0, 20, 20);

              const text34 = 'CLÁUSULA DÉCIMA SÉTIMA: Os pagamentos dos eventuais débitos oriundos da vistoria final deverão ser efetuados em até 18 (Dezoito) dias após a entrega das chaves.'
              const lines34 = doc.splitTextToSize(text34, maxLineWidth);
              lines34.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 25 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text35 = 'CLÁUSULA DÉCIMA OITAVA: Não poderá o LOCATÁRIO fazer modificações ou transformações no imóvel locado sem que haja prévio consentimento por escrito do LOCADOR. '
              const lines35 = doc.splitTextToSize(text35, maxLineWidth);
              lines35.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 40 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text36 = 'CLÁUSULA DÉCIMA NONA: As benfeitorias necessárias e úteis efetuadas ficarão incorporadas ao imóvel locado, não tendo o LOCATÁRIO direito de retenção ao término da locação, tampouco lhe possibilitando a exigências de qualquer indenização, salvo em caso de benfeitorias necessárias que forem custeadas pelos locatários e as quais não tenham dado causa. Quanto às benfeitorias voluptuárias, elas poderão ser levantadas pelo LOCATÁRIO.'
              const lines36 = doc.splitTextToSize(text36, maxLineWidth);
              lines36.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 60 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text37 = 'CLÁUSULA VIGÉSIMA: O LOCATÁRIO deve comunicar formalmente e com até 30 (trinta) dias antecedência ao término deste contrato o desejo de renovação ou rompimento do contrato.'
              const lines37 = doc.splitTextToSize(text37, maxLineWidth);
              lines37.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 95 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text38 = 'CLÁUSULA VIGÉSIMA PRIMEIRA: Considerar-se-á rescindido o presente contrato, com o término imediato e automático da locação, independentemente de procedimento judicial e pagamento de qualquer quantia a título de multa nos seguintes casos de desapropriação, incêndio ou desabamento, força maior ou casos fortuitos que impeçam o uso normal do imóvel. Todavia, permanecendo o LOCATÁRIO no imóvel após a vigência do contrato sem oposição do LOCADOR ficará prorrogado por prazo indeterminado nos termos da Lei de Locação.'
              const lines38 = doc.splitTextToSize(text38, maxLineWidth);
              lines38.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 110 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text39 = 'CLÁUSULA VIGÉSIMA SEGUNDA: Fica estipulada a multa no valor igual a 02 (dois) aluguéis para a parte que infringir quaisquer das cláusulas deste contrato, sem prejuízo de valores em aberto e dos encargos da cláusula sexta.'
              const lines389 = doc.splitTextToSize(text39, maxLineWidth);
              lines389.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 150 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text40 = 'CLÁUSULA VIGÉSIMA TERCEIRA: O LOCATÁRIO, concorda desde já, em depositar a título de fiança, a caução de R$ ' + this.caucao + ', cujo valor ficará em posse do proprietário, e será devolvido AO LOCATÁRIO ao término deste contrato, se o imóvel for entregue no mesmo estado em que foi locado.'
              const lines40 = doc.splitTextToSize(text40, maxLineWidth);
              lines40.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 175 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text41 = 'CLÁUSULA VIGÉSIMA QUARTA: O LOCATÁRIO, está ciente que:\n Em casos de atraso do aluguel terá a multa (informada na cláusula sexta) E que após 15 DIAS DE ATRASO, irá gerar quebra de contrato, atrasos de água e luz com atrasos de mais de 30 dias também podem haver quebra de contrato, por parte da intermediária.'
              const lines41 = doc.splitTextToSize(text41, maxLineWidth);
              lines41.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 205 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text42 = 'CLÁUSULA VIGÉSIMA QUINTA: Para dirimir qualquer questão oriunda do presente contrato fica desde já eleito o foro de Curitiba-PR, com renúncia expressa de qualquer outro, por mais privilegiado que seja. Assim como eventuais omissões serão reguladas de acordo com a Lei Federal n.8245 de 1991. E, por estarem justas e contratadas, firmam este instrumento particular de contrato de locação de imóvel em 03 (três) vias de igual teor e forma.'
              const lines42 = doc.splitTextToSize(text42, maxLineWidth);
              lines42.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 235 + (index * 6);
                doc.text(line, textX, textY);
              });

              doc.text('5', 195, 290);
              doc.addPage();

              doc.addImage(imageUrl, 'JPEG', 97, 0, 20, 20);

              const text43 = 'PARÁGRAFO PRIMEIRO: Caso o imóvel não seja entregue no mesmo estado em que foi locado, a IMOBILIÁRIA fica autorizada desde já a proceder às reformas e manutenções necessárias para devolução do imóvel ao seu estado, descontado do valor da caução, independentemente de eventuais multas e outros procedimentos.'
              const lines43 = doc.splitTextToSize(text43, maxLineWidth);
              lines43.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 25 + (index * 6);
                doc.text(line, textX, textY);
              });

              const text44 = 'PARAGRAFO SEGUNDO – UTILIZAÇÃO DA CAUÇÃO: O valor da caução será usado em todas as hipóteses as quais se farão necessários recursos provenientes do LOCATÁRIO. Caso que, sendo aplicado, tal numerário imediatamente será reposto. Finda a LOCAÇÃO com a concretização da entrega das chaves e observados os requisitos constantes neste contrato para sua validade, a IMOBILIÁRIA realizará a do montante depositado, sem prejuízo da Ação Judicial adequada.'
              const lines44 = doc.splitTextToSize(text44, maxLineWidth);
              lines44.forEach((line: any, index: any) => {
                const textX = 11;
                const textY = 55 + (index * 6);
                doc.text(line, textX, textY);
              });

              doc.text('6', 195, 290);

              doc.setFontSize(18);

              function formatearFecha(fecha: Date): string {
                const meses = [
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro'
                ];

                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = meses[fecha.getMonth()];
                const año = fecha.getFullYear();

                return `${dia} de ${mes} de ${año}`;
              }

              doc.text(this.cidade + '(PR), ' + formatearFecha(fecha), 50, 100);

              doc.setFontSize(14);
              doc.text('__________________________________', 11, 150);

              doc.text('Nome: ' + prop.usuPerId.perNombre + ' ' + prop.usuPerId.perApellido + ' - (Locador)', 11, 157);
              doc.text('CPF (ME): ' + prop.usuPerId.perCedula, 11, 162);

              doc.text('__________________________________', 11, 190);
              doc.text('Nome: ' + inq.usuPerId.perNombre + ' ' + inq.usuPerId.perApellido + ' - (Locatário)', 11, 197);
              doc.text('CPF (ME): ' + inq.usuPerId.perCedula, 11, 202);

              doc.text('__________________________________', 11, 230);
              doc.text('IMÓVEIS PORTAL CIC – (Intermediária)', 11, 237);
              doc.text('CNPJ: 23.849.230/0001-25', 11, 242);

              //gerar
              doc.save('contrato_' + inq.usuPerId.perNombre + '_' + inq.usuPerId.perApellido + '.pdf');
              this.toastr.success("GERADO CORRETAMENTE");
              this.limpar();
            } else {
              this.toastr.error("Proprietário não encontrado");
            }
          })
        } else {
          this.toastr.error("Inquilino não encontrado");
        }
      });
    }
  }

  limpar() {
    this.searchString = '';
    this.valorInicial = '';
    this.pagamento = '';
    this.diaPagamento = '';
    this.plazo = '';
    this.caucao = '';
    this.cidade = '';
    this.tipo = '';
    this.matricula = '';
    this.unidade = '';
    this.finalidade = '';
    this.endereco = '';
    this.temIptu = false;
    this.valorIptu = '';
  }

}
