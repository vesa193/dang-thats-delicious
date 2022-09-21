import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
    e.preventDefault();
    console.log(this, this.heart);
    axios.post(this.action)
        .then(res => {
            const isHearted = this.heart.classList.toggle('heart__button--hearted');
            console.log('isHEarted', isHearted);
            $('.heart-count').textContent = res.data.hearts.length;
            if (isHearted) {
                this.heart.classList.add('heart__button--float');
                setTimeout(() => {
                    console.log('eee', this.heart);
                    this.heart.classList.remove('heart__button--float')
                }, 2500);
            }
        })
        .catch(console.error)
}

export default ajaxHeart;
