# 📌 Projet API REST – Mini Réseau Social  

## 👥 Membres du groupe  
- Hicham  
- Alexandre  
- Luca  
- Logan  

---

## 📖 Description du projet  
Ce projet consiste à développer une **API REST** avec **Node.js + Express** et une base de données **MySQL**.  
L’API permet de gérer un petit réseau social avec les fonctionnalités suivantes :  
- **Utilisateurs** : inscription, connexion (JWT), récupération des informations d’un utilisateur  
- **Posts** : création, lecture, modification et suppression (CRUD)  
- **Commentaires** : ajout, lecture, modification et suppression liés aux posts  
- **Bonus** : possibilité d’ajouter une image lors de la création d’un post (upload avec Multer)  

L’ensemble des routes est sécurisé via un **JWT** et respecte les codes HTTP standards (201, 400, 401, 403, 404, etc.).  

---

## ⚙️ Organisation du projet  
- `auth/` : routes d’authentification (register / login)  
- `post/` : routes CRUD des posts  
- `comment/` : routes CRUD des commentaires  
- `middleware/` : gestion du JWT et autres middlewares  
- `model/` : modèles Sequelize (User, Post, Comment)  
- `controller/` : logique métier pour chaque entité  

---

## 📌 Répartition des tâches  
- Hicham : Mise en place des controllers
- Alexandre : Mise en place des controllers (pour épauller Hicham) et routes
- Luca : Vérification des fichiers en général (Sync, Index, etc...) + Commentaires et harmonisation (ps : il était indispensable)
- Logan : CommentController + Commentaires et harmonisation des "Model"
