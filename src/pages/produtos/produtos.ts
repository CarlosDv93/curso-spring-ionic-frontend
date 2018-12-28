import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl : LoadingController) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get("categoria_id");
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
        loader.dismiss();
      }, error => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(){
    for(var i = 0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallFileFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
        error => {});
    }
  }

  showDetails(produto_id : string){
    this.navCtrl.push("ProdutoDetailPage", {produto_id : produto_id});
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde ......."
    });
    loader.present();
    return loader;
  }

}
