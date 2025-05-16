import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

const category = [{ name: "Thời Trang Nam", image: 'https://i.ibb.co/3HHb6qj/image.png' },
{ name: "Điện Thoại & Phụ Kiện", image: 'https://i.ibb.co/Z6DxRmvK/F2-B4-B489-6288-4-C6-C-94-E6-CA708-F64-E0-DB.png' },
{ name: "Thiết Bị Điện Tử", image: 'https://th.bing.com/th/id/OIP.35GmgMyAqRYBTbgMAcPNoQHaFY?rs=1&pid=ImgDetMain' },
{ name: "Máy Tính & Laptop", image: 'https://i.ibb.co/mrHLXgnx/BE00-E0-A4-AC82-44-B3-95-DB-B64-FD65577-D0.png' },
{ name: "Máy Quay Phim", image: 'https://i.ibb.co/XxPkrz8B/image.png' },
{ name: "Đồng Hồ", image: 'https://i.ibb.co/604jKz1s/32145-BDC-C2-E3-4-C7-A-B266-AF79329-BFFC7.png' },
{ name: "Giày Dép Nam", image: 'https://i.ibb.co/gLzc33bv/E45-C045-A-299-B-4252-B6-F3-E8-AA3-CA20-C67.png' },
{ name: "Thiết Bị Điện Gia Dụng", image: 'https://i.ibb.co/h1cxgVLQ/14-F8-B434-B5-CE-4-AE2-82-B7-FBD32-F58-ABF6.png' },
{ name: "Thời Trang Nữ", image: 'https://cdn.yoox.biz/16/16142998IA_14_F.JPG' },
{ name: "Mẹ & Bé", image: 'https://img.freepik.com/premium-photo/isolated-toy-white-background_941625-315.jpg' },
{ name: "Nhà Cửa & Đời Sống", image: 'https://img.freepik.com/premium-psd/contemporary-european-house-isolated-white-background_623938-1941.jpg?w=2000' },
{ name: "Sắc Đẹp", image: 'https://th.bing.com/th/id/OIP.WK3mUjKjJ7oFH9-R_jHD6gHaFv?rs=1&pid=ImgDetMain' },
{ name: "Sức Khỏe", image: 'https://thumbs.dreamstime.com/b/medicine-white-background-22264495.jpg' },
{ name: "Giày Dép Nữ", image: 'https://i.ibb.co/chmpjnpb/73-D8-F1-EB-DF61-40-A8-8-B08-3195-B311-CF63.png' },
{ name: "Túi Ví Nữ", image: 'https://th.bing.com/th/id/OIP.StDahEF95RJtS2NB7aT0JgHaHm?rs=1&pid=ImgDetMain' },
{ name: "Trang Sức Nữ", image: 'https://img.freepik.com/premium-photo/diamond-engagement-ring-isolated-white-background_972155-65.jpg?w=2000' },
]
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {
       
    }
     async saveCategory(){
            
        return await this.categoryRepository.save(category)
    }
    async getCategory(){
        try{
            const categories = await this.categoryRepository.find()
            return categories
        }catch(e){
            throw new BadRequestException(['Lỗi không thể thấy category'])
        }
    }
}
