import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get("categoria_id");
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      }, error => {}
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

  showDetails(){
    this.navCtrl.push("ProdutoDetailPage");
  }

}
