using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace cross_app
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class BeforeCalcPage : ContentPage
	{
        #region コントロールの宣言

        #region 箱の宣言

        #region 基本の箱

        //一番外側のStackLayout
        AbsoluteLayout outestAl = new AbsoluteLayout
        {
            BackgroundColor = Color.Blue
        };


        //上半分
        AbsoluteLayout topAl = new AbsoluteLayout
        {
            //Orientation = StackOrientation.Horizontal,
            //VerticalOptions = LayoutOptions.Start,
            BackgroundColor = Color.Red,
        };

        //上の右半分
        AbsoluteLayout topRightAl = new AbsoluteLayout
        {
            BackgroundColor = Color.DarkOrange,
        };

        //上の右の左半分
        AbsoluteLayout topRightLeftAl = new AbsoluteLayout
        {

        };

        //上の右の右半分
        AbsoluteLayout topRightRightAl = new AbsoluteLayout
        {

        };

        //上の右の右の上半分
        AbsoluteLayout topRightRightTopAl = new AbsoluteLayout
        {

        };

        //上の右の右の下半分
        AbsoluteLayout topRightRightBottomAl = new AbsoluteLayout
        {

        };


        //下半分
        AbsoluteLayout bottomAl = new AbsoluteLayout
        {

        };

        //下の上半分
        AbsoluteLayout bottomTopAl = new AbsoluteLayout
        {
            BackgroundColor = Color.DarkBlue,
        };

        //下の下半分
        AbsoluteLayout bottomBottomAl = new AbsoluteLayout
        {
            //BackgroundColor = Color.DarkGreen,
        };

        //下の下の左半分
        AbsoluteLayout bottomBottomLeftAl = new AbsoluteLayout
        {

        };

        //下の下の左の上半分
        AbsoluteLayout bottomBottomLeftTopAl = new AbsoluteLayout
        {

        };

        //下の下の左の上の左半分
        AbsoluteLayout bottomBottomLeftTopLeftAl = new AbsoluteLayout
        {

        };

        //下の下の左の上の左の上半分
        AbsoluteLayout bottomBottomLeftTopLeftTopAl = new AbsoluteLayout
        {
            BackgroundColor = Color.DarkOrange,
        };

        //下の下の左の上の左の下半分
        AbsoluteLayout bottomBottomLeftTopLeftBottomAl = new AbsoluteLayout
        {
            BackgroundColor = Color.Orange,
        };

        //下の下の左の上の右半分
        AbsoluteLayout bottomBottomLeftTopRightAl = new AbsoluteLayout
        {

        };

        //下の下の左の上の右の上半分
        AbsoluteLayout bottomBottomLeftTopRightTopAl = new AbsoluteLayout
        {
            BackgroundColor = Color.LemonChiffon,
        };

        //下の下の左の上の右の下半分
        AbsoluteLayout bottomBottomLeftTopRightBottomAl = new AbsoluteLayout
        {
            BackgroundColor = Color.Chocolate,
        };

        //下の下の左の下半分
        AbsoluteLayout bottomBottomLeftBottomAl = new AbsoluteLayout
        {
            BackgroundColor = Color.Salmon,
        };

        //下の下の右半分
        AbsoluteLayout bottomBottomRightAl = new AbsoluteLayout
        {

        };

        //下の下の右の上半分
        AbsoluteLayout bottomBottomRightTopAl = new AbsoluteLayout
        {
            BackgroundColor = Color.Ivory,
        };

        //下の下の右の下半分
        AbsoluteLayout bottomBottomRightBottomAl = new AbsoluteLayout
        {
            BackgroundColor = Color.LightPink,
        };

        #endregion

        #region 鳴き状況によって変わるやつ

        //上のアガリ牌全部のStackLayout
        StackLayout agariPaiSl = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
            
        };

        //上のアガリの形のメンゼン牌の表示部分
        AbsoluteLayout agariMenzenPaiAl = new AbsoluteLayout
        {

        };

        StackLayout agariMenzenPaiSl = new StackLayout
        {
            Orientation = StackOrientation.Horizontal
        };

        //上のアガリの形の鳴き牌の表示部分の右から1番目
        StackLayout agariNaki1PaiSl = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
        };

        //上のアガリの形の鳴き牌の表示部分の右から2番目
        StackLayout agariNaki2PaiSl = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
        };

        //上のアガリの形の鳴き牌の表示部分の右から3番目
        StackLayout agariNaki3PaiSl = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
        };

        //上のアガリの形の鳴き牌の表示部分の右から4番目
        StackLayout agariNaki4PaiSl = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
        };
        #endregion

        #region ドラ表示牌StackLayout

        StackLayout doraHyojiSl01 = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
        };

        StackLayout doraHyojiSl02 = new StackLayout
        {
            Orientation = StackOrientation.Horizontal,
        };


        #endregion

        #endregion

        #region 中身の宣言（ボタン、ラベルなど）

        #region 一番上の段

        Label label_agariKatachi = new Label
        {
            Text = "アガリの形",
            //Scale = 0.25,
            //HorizontalOptions = LayoutOptions.StartAndExpand,
            //VerticalOptions = LayoutOptions.Start,
            //MaxLines = 1,
            FontSize = Device.GetNamedSize(NamedSize.Micro, typeof(Label)),
            BackgroundColor = Color.Aqua,
        };
        
        Button button_ponchi_dec = new Button
        {
            Text = "-",
            //FontSize = 58,
            //HeightRequest = 10,
            //WidthRequest = 20,
            //Scale = 0.25,
            BackgroundColor = Color.White,
            FontSize = Device.GetNamedSize(NamedSize.Micro, typeof(Label)),
            Padding = new Thickness(0,0,0,0)
            //ScaleY = 0.5,
            //ScaleX = 0.25
            //Margin = 0
        };

        Label label_pon_chi_kazu = new Label
        {
            Text = "ポン・チーの数",
            FontSize = Device.GetNamedSize(NamedSize.Micro, typeof(Label)),
            BackgroundColor = Color.Aqua,
            //AnchorX = 0
        };

        Button button_ponchi_inc = new Button
        {
            Text = "+",
            BackgroundColor = Color.Black,
            Padding = new Thickness(0, 0, 0, 0)
            //Scale = 0.25
        };

        Button button_ankan_dec = new Button
        {
            Text = "-",
            BackgroundColor = Color.Brown,
            Padding = new Thickness(0, 0, 0, 0)
            //Scale = 0.25
        };

        Label label_ankan_kazu = new Label
        {
            Text = "暗カンの数",
            FontSize = Device.GetNamedSize(NamedSize.Micro, typeof(Label)),
            //Scale = 0.25
        };

        Button button_ankan_inc = new Button
        {
            Text = "+",
            BackgroundColor = Color.Brown,
            Padding = new Thickness(0, 0, 0, 0)
            //Scale = 0.25
        };

        Button button_minkan_dec = new Button
        {
            Text = "-",
            BackgroundColor = Color.Brown,
            Padding = new Thickness(0, 0, 0, 0)
        };

        Label label_minkan_kazu = new Label
        {
            Text = "明カンの数",
            FontSize = Device.GetNamedSize(NamedSize.Micro, typeof(Label)),
        };

        Button button_minkan_inc = new Button
        {
            Text = "+",
            BackgroundColor = Color.Brown,
            Padding = new Thickness(0, 0, 0, 0)
        };

        #endregion

        #region アガリ牌

        #region メンゼン牌

        Image image_menzenPai01 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai02 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai03 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai04 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m2.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai05 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m3.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai06 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m4.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai07 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m5.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai08 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m5.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai09 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m6.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai10 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m7.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai11 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m8.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai12 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m9.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai13 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m9.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_menzenPai14 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m9.png"),
            Aspect = Aspect.AspectFill,
        };

        #endregion

        #region 鳴いた牌

        #region 鳴き1個目

        Image image_nakiPai1_01 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.p1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_nakiPai1_02 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.p1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_nakiPai1_03 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.p1.png"),
            Aspect = Aspect.AspectFill,
        };

        #endregion

        #region 鳴き2個目

        Image image_nakiPai2_01 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.s5.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_nakiPai2_02 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.s5.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_nakiPai2_03 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.s5.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_nakiPai2_04 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.s5.png"),
            Aspect = Aspect.AspectFill,
        };

        #endregion

        #endregion

        #endregion

        #region ドラ表示

        #region ドラ表示牌
        Image image_dora01 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora02 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m2.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora03 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m3.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora04 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m4.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora05 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m5.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora06 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m6.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora07 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m7.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora08 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.m8.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora09 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.s1.png"),
            Aspect = Aspect.AspectFill,
        };

        Image image_dora10 = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.s2.png"),
            Aspect = Aspect.AspectFill,
        };
        #endregion

        Label label_dora_hyoujiPai = new Label
        {
            Text = "ドラ表示牌"
        };

        #endregion

        #region 場風・自風

        Label label_bakaze_jikaze = new Label
        {
            Text = "場風・自風",
        };

        Image image_bakaze = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.ton.png"),
            Aspect = Aspect.AspectFill,
        };

        Label label_bakaze = new Label
        {
            Text = "場風",
            VerticalTextAlignment = TextAlignment.Center,
            HorizontalTextAlignment = TextAlignment.Center,
        };

        Image image_jikaze = new Image
        {
            Source = ImageSource.FromResource("cross_app.images_pai.nan.png"),
            Aspect = Aspect.AspectFill,
        };

        Label label_jikaze = new Label
        {
            Text = "自風",
            VerticalTextAlignment = TextAlignment.Center,
            HorizontalTextAlignment = TextAlignment.Center,
        };

        #endregion

        #region アガリ方・役入力の部分

        Label label_agari_yaku = new Label
        {
            Text = "アガリ方・手動入力役"
        };

        #region 後付け役ボタン

        Button button_tsumo = new Button
        {
            Text = "ツモ",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_ron = new Button
        {
            Text = "ロン",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.Red,
        };

        Button button_richi = new Button
        {
            Text = "リーチ",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_double_richi = new Button
        {
            Text = "ダブリー",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_ippatsu = new Button
        {
            Text = "イッパツ",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_rinshan = new Button
        {
            Text = "嶺上",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_chankan = new Button
        {
            Text = "槍槓",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_umi_kawa_soko = new Button
        {
            Text = "河海底",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        Button button_tenho_chiho = new Button
        {
            Text = "天和・地和",
            Padding = new Thickness(0, 0, 0, 0),
            BackgroundColor = Color.White,
        };

        #endregion

        #endregion

        #region 一番左下のボタン

        Button button_mokkai = new Button
        {
            Text = "もっかい",
            Padding = new Thickness(0, 0, 0, 0)
        };

        Button button_keisan = new Button
        {
            Text = "計算",
            Padding = new Thickness(0, 0, 0, 0)
        };

        #endregion

        #endregion

        #region ポップアップのLayout

        //ポップアップの土台
        AbsoluteLayout popUpBg = new AbsoluteLayout
        {

        };



        #endregion

        #endregion

        public BeforeCalcPage()
        {
            InitializeComponent();
            NavigationPage.SetHasNavigationBar(this, false);


            #region 箱の挙動
            outestAl.Children.Add(topAl);
            //outestSl.Children.Add(paiGrid);
            AbsoluteLayout.SetLayoutFlags(topAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(topAl,new Rectangle(0,0,1,0.14));

            //上の右
            topAl.Children.Add(topRightAl);
            AbsoluteLayout.SetLayoutFlags(topRightAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(topRightAl, new Rectangle(1, 0, 0.5, 1));

            //上の右の左
            topRightAl.Children.Add(topRightLeftAl);
            AbsoluteLayout.SetLayoutFlags(topRightLeftAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(topRightLeftAl, new Rectangle(0, 0, 0.5, 1));

            //上の右の右
            topRightAl.Children.Add(topRightRightAl);
            AbsoluteLayout.SetLayoutFlags(topRightRightAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(topRightRightAl, new Rectangle(1, 0, 0.5, 1));

            //上の右の右の上
            topRightRightAl.Children.Add(topRightRightTopAl);
            AbsoluteLayout.SetLayoutFlags(topRightRightTopAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(topRightRightTopAl, new Rectangle(0, 0, 1, 0.5));

            //上の右の右の下
            topRightRightAl.Children.Add(topRightRightBottomAl);
            AbsoluteLayout.SetLayoutFlags(topRightRightBottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(topRightRightBottomAl, new Rectangle(0, 1, 1, 0.5));

            //下
            outestAl.Children.Add(bottomAl);
            AbsoluteLayout.SetLayoutFlags(bottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomAl, new Rectangle(0, 1, 1, 0.86));

            //下の上
            bottomAl.Children.Add(bottomTopAl);
            AbsoluteLayout.SetLayoutFlags(bottomTopAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomTopAl, new Rectangle(0.5, 0, 1, (21.0 / 86.0)));

            //下の下
            bottomAl.Children.Add(bottomBottomAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomAl, new Rectangle(0, 1, 1, (65.0 / 86.0)));

            //下の下の左
            bottomBottomAl.Children.Add(bottomBottomLeftAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftAl, new Rectangle(0, 0, 0.64, 1));

            //下の下の左の上
            bottomBottomLeftAl.Children.Add(bottomBottomLeftTopAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopAl, new Rectangle(0, 0, 1, (51.0 / 65.0)));

            //下の下の左の上の左
            bottomBottomLeftTopAl.Children.Add(bottomBottomLeftTopLeftAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopLeftAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopLeftAl, new Rectangle(0, 0, (48.0 / 64.0), 1));

            //下の下の左の上の左の上
            bottomBottomLeftTopLeftAl.Children.Add(bottomBottomLeftTopLeftTopAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopLeftTopAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopLeftTopAl, new Rectangle(0, 0, 1, (14.0 / 51.0)));

            //下の下の左の上の左の下
            bottomBottomLeftTopLeftAl.Children.Add(bottomBottomLeftTopLeftBottomAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopLeftBottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopLeftBottomAl, new Rectangle(0, 1, 1, (37.0 / 51.0)));

            //下の下の左の上の右
            bottomBottomLeftTopAl.Children.Add(bottomBottomLeftTopRightAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopRightAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopRightAl, new Rectangle(1, 0, (16.0 / 64.0), 1));

            //下の下の左の上の右の上
            bottomBottomLeftTopRightAl.Children.Add(bottomBottomLeftTopRightTopAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopRightTopAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopRightTopAl, new Rectangle(0, 0, 1, (14.0 / 51.0)));

            //下の下の左の上の右の下
            bottomBottomLeftTopRightAl.Children.Add(bottomBottomLeftTopRightBottomAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftTopRightBottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftTopRightBottomAl, new Rectangle(0, 1, 1, (37.0 / 51.0)));

            //下の下の左の下
            bottomBottomLeftAl.Children.Add(bottomBottomLeftBottomAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomLeftBottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomLeftBottomAl, new Rectangle(0, 1, 1, (14.0 / 65.0)));

            //下の下の右
            bottomBottomAl.Children.Add(bottomBottomRightAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomRightAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomRightAl, new Rectangle(1, 0, 0.36, 1));

            //下の下の右の上
            bottomBottomRightAl.Children.Add(bottomBottomRightTopAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomRightTopAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomRightTopAl, new Rectangle(0, 0, 1, (14.0 / 65.0)));

            //下の下の右の下
            bottomBottomRightAl.Children.Add(bottomBottomRightBottomAl);
            AbsoluteLayout.SetLayoutFlags(bottomBottomRightBottomAl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(bottomBottomRightBottomAl, new Rectangle(0, 1, 1, (51.0 / 65.0)));




























            #endregion

            #region ボタン・ラベル追加

            #region 一番上の部分

            topAl.Children.Add(label_agariKatachi);
            AbsoluteLayout.SetLayoutFlags(label_agariKatachi, AbsoluteLayoutFlags.PositionProportional);
            AbsoluteLayout.SetLayoutBounds(label_agariKatachi, new Rectangle(0.25, 0.5, AbsoluteLayout.AutoSize, AbsoluteLayout.AutoSize));
            
            topRightLeftAl.Children.Add(button_ponchi_dec);
            AbsoluteLayout.SetLayoutFlags(button_ponchi_dec, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_ponchi_dec, new Rectangle(0, 0.5, 0.3, 0.75));

            topRightLeftAl.Children.Add(label_pon_chi_kazu);
            AbsoluteLayout.SetLayoutFlags(label_pon_chi_kazu, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(label_pon_chi_kazu, new Rectangle(0.5, 0.5, 0.3, 0.75));

            topRightLeftAl.Children.Add(button_ponchi_inc);
            AbsoluteLayout.SetLayoutFlags(button_ponchi_inc, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_ponchi_inc, new Rectangle(1, 0.5, 0.3, 0.75));

            topRightRightTopAl.Children.Add(button_ankan_dec);
            AbsoluteLayout.SetLayoutFlags(button_ankan_dec, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_ankan_dec, new Rectangle(0, 0.5, 0.3, 0.75));

            topRightRightTopAl.Children.Add(label_ankan_kazu);
            AbsoluteLayout.SetLayoutFlags(label_ankan_kazu, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(label_ankan_kazu, new Rectangle(0.5, 0.5, 0.3, 0.75));

            topRightRightTopAl.Children.Add(button_ankan_inc);
            AbsoluteLayout.SetLayoutFlags(button_ankan_inc, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_ankan_inc, new Rectangle(1, 0.5, 0.3, 0.75));

            topRightRightBottomAl.Children.Add(button_minkan_dec);
            AbsoluteLayout.SetLayoutFlags(button_minkan_dec, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_minkan_dec, new Rectangle(0, 0.5, 0.3, 0.75));

            topRightRightBottomAl.Children.Add(label_minkan_kazu);
            AbsoluteLayout.SetLayoutFlags(label_minkan_kazu, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(label_minkan_kazu, new Rectangle(0.5, 0.5, 0.3, 0.75));

            topRightRightBottomAl.Children.Add(button_minkan_inc);
            AbsoluteLayout.SetLayoutFlags(button_minkan_inc, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_minkan_inc, new Rectangle(1, 0.5, 0.3, 0.75));

            #endregion

            #region アガリ牌

            #region とりあえずメンゼン牌だけ

            bottomTopAl.Children.Add(agariPaiSl);
            AbsoluteLayout.SetLayoutFlags(agariPaiSl, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(agariPaiSl, new Rectangle(0.5, 0.5, 1, 1));

            agariPaiSl.Spacing = 0;

            agariPaiSl.Children.Add(agariMenzenPaiSl);

            agariMenzenPaiSl.HorizontalOptions = LayoutOptions.CenterAndExpand;
            //AbsoluteLayout.SetLayoutFlags(agariMenzenPaiSl, AbsoluteLayoutFlags.All);
            //AbsoluteLayout.SetLayoutBounds(agariMenzenPaiSl, new Rectangle(0.5, 0.5, 1, 1));

            Image[] image_menzenPai = 
            {
                image_menzenPai01,
                image_menzenPai02,
                image_menzenPai03,
                image_menzenPai04,
                image_menzenPai05,
                image_menzenPai06,
                image_menzenPai07,
                image_menzenPai08,
                image_menzenPai09,
                image_menzenPai10,
                image_menzenPai11,
                image_menzenPai12,
                image_menzenPai13,
                image_menzenPai14
            };

            for (int i = 0; i < image_menzenPai.Length; i++)
            {
                agariMenzenPaiSl.Children.Add(image_menzenPai[i]);
                agariMenzenPaiSl.Spacing = 0;
                image_menzenPai[i].MinimumWidthRequest = 5;
                image_menzenPai[i].MinimumHeightRequest = 7;
                image_menzenPai[i].VerticalOptions = LayoutOptions.CenterAndExpand;
                image_menzenPai[i].HorizontalOptions = LayoutOptions.Center;
            }
            image_menzenPai[0].HorizontalOptions = LayoutOptions.EndAndExpand;
            image_menzenPai[13].HorizontalOptions = LayoutOptions.StartAndExpand;


            #endregion

            #region 鳴き1個追加(ポンチー)

            //メンゼン牌StackLayoutプロパティ変更
            agariMenzenPaiSl.HorizontalOptions = LayoutOptions.EndAndExpand;

            #region メンゼン牌3つ取り除く

            agariMenzenPaiSl.Children.Remove(image_menzenPai02);
            agariMenzenPaiSl.Children.Remove(image_menzenPai03);
            agariMenzenPaiSl.Children.Remove(image_menzenPai04);


            #endregion

            agariPaiSl.Children.Add(agariNaki1PaiSl);
            agariNaki1PaiSl.BackgroundColor = Color.DeepPink;
            agariNaki1PaiSl.HorizontalOptions = LayoutOptions.StartAndExpand;
            agariNaki1PaiSl.Spacing = 0;

            Image[] image_nakiPai1 =
            {
                image_nakiPai1_01,
                image_nakiPai1_02,
                image_nakiPai1_03
            };

            for (int i = 0; i < image_nakiPai1.Length; i++)
            {
                agariNaki1PaiSl.Children.Add(image_nakiPai1[i]);
                image_nakiPai1[i].MinimumWidthRequest = 5;
                image_nakiPai1[i].MinimumHeightRequest = 7;
                image_nakiPai1[i].VerticalOptions = LayoutOptions.CenterAndExpand;
                if (i == 0)
                {
                    image_nakiPai1[i].HorizontalOptions = LayoutOptions.EndAndExpand;
                }
                else if (i == image_nakiPai1.Length - 1)
                {
                    image_nakiPai1[i].HorizontalOptions = LayoutOptions.StartAndExpand;
                }
                else
                {
                    image_nakiPai1[i].HorizontalOptions = LayoutOptions.Center;
                }
            }

            //image_nakiPai1_01.MinimumWidthRequest = 7;
            //image_nakiPai1_01.Bounds = new Rectangle()
            //image_nakiPai1_01.Aspect = Aspect.AspectFit;
            //image_nakiPai1_01.Rotation = 90;

            #endregion

            #region 鳴き1個追加(暗カン)

            //すでに追加されてる鳴きStackLayoutプロパティの変更
            agariNaki1PaiSl.HorizontalOptions = LayoutOptions.Center;

            #region メンゼン牌3つ取り除く

            agariMenzenPaiSl.Children.Remove(image_menzenPai02);
            agariMenzenPaiSl.Children.Remove(image_menzenPai03);
            agariMenzenPaiSl.Children.Remove(image_menzenPai04);


            #endregion

            agariPaiSl.Children.Add(agariNaki2PaiSl);
            agariNaki2PaiSl.BackgroundColor = Color.GreenYellow;
            agariNaki2PaiSl.HorizontalOptions = LayoutOptions.StartAndExpand;
            agariNaki2PaiSl.Spacing = 0;

            Image[] image_nakiPai2 =
            {
                image_nakiPai2_01,
                image_nakiPai2_02,
                image_nakiPai2_03,
                image_nakiPai2_04
            };

            for (int i = 0; i < image_nakiPai2.Length; i++)
            {
                agariNaki2PaiSl.Children.Add(image_nakiPai2[i]);
                image_nakiPai2[i].MinimumWidthRequest = 5;
                image_nakiPai2[i].MinimumHeightRequest = 7;
                image_nakiPai2[i].VerticalOptions = LayoutOptions.CenterAndExpand;
                if (i == 0)
                {
                    image_nakiPai2[i].HorizontalOptions = LayoutOptions.EndAndExpand;
                    image_nakiPai2[i].Margin = new Thickness(10, 0, 0, 0);
                }
                else if (i == image_nakiPai2.Length - 1)
                {
                    image_nakiPai2[i].HorizontalOptions = LayoutOptions.StartAndExpand;
                }
                else
                {
                    image_nakiPai2[i].HorizontalOptions = LayoutOptions.Center;
                }
            }

            #endregion

            #endregion

            #region 後付け役ボタン群・ラベル

            bottomBottomRightTopAl.Children.Add(label_agari_yaku);
            AbsoluteLayout.SetLayoutFlags(label_agari_yaku, AbsoluteLayoutFlags.PositionProportional);
            AbsoluteLayout.SetLayoutBounds(label_agari_yaku, new Rectangle(0.5, 0.5, AbsoluteLayout.AutoSize, AbsoluteLayout.AutoSize));

            bottomBottomRightBottomAl.Children.Add(button_tsumo);
            AbsoluteLayout.SetLayoutFlags(button_tsumo, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_tsumo, new Rectangle(0.05, 0.05, 0.3, 0.2));

            bottomBottomRightBottomAl.Children.Add(button_ron);
            AbsoluteLayout.SetLayoutFlags(button_ron, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_ron, new Rectangle(0.5, 0.05, 0.3, 0.2));

            bottomBottomRightBottomAl.Children.Add(button_richi);
            AbsoluteLayout.SetLayoutFlags(button_richi, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_richi, new Rectangle(0.05, 0.38, 0.3, 0.2));

            bottomBottomRightBottomAl.Children.Add(button_double_richi);
            AbsoluteLayout.SetLayoutFlags(button_double_richi, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_double_richi, new Rectangle(0.5, 0.38, 0.3, 0.2));


            bottomBottomRightBottomAl.Children.Add(button_ippatsu);
            AbsoluteLayout.SetLayoutFlags(button_ippatsu, AbsoluteLayoutFlags.All);
            
            //リーチの時の位置
            //AbsoluteLayout.SetLayoutBounds(button_ippatsu, new Rectangle(0.05, 0.65, 0.3, 0.2));
            //ダブリーの時の位置
            //AbsoluteLayout.SetLayoutBounds(button_ippatsu, new Rectangle(0.5, 0.65, 0.3, 0.2));


            bottomBottomRightBottomAl.Children.Add(button_rinshan);
            AbsoluteLayout.SetLayoutFlags(button_rinshan, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_rinshan, new Rectangle(0.05, 0.95, 0.3, 0.2));


            bottomBottomRightBottomAl.Children.Add(button_chankan);
            AbsoluteLayout.SetLayoutFlags(button_chankan, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_chankan, new Rectangle(0.5, 0.95, 0.3, 0.2));


            bottomBottomRightBottomAl.Children.Add(button_umi_kawa_soko);
            AbsoluteLayout.SetLayoutFlags(button_umi_kawa_soko, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_umi_kawa_soko, new Rectangle(0.95, 0.95, 0.3, 0.2));


            bottomBottomRightBottomAl.Children.Add(button_tenho_chiho);
            AbsoluteLayout.SetLayoutFlags(button_tenho_chiho, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_tenho_chiho, new Rectangle(0.95, 0.51, 0.3, 0.41));






            #endregion


            #region ドラ表示牌・ラベル


            bottomBottomLeftTopLeftTopAl.Children.Add(label_dora_hyoujiPai);
            AbsoluteLayout.SetLayoutFlags(label_dora_hyoujiPai, AbsoluteLayoutFlags.PositionProportional);
            AbsoluteLayout.SetLayoutBounds(label_dora_hyoujiPai, new Rectangle(0.5, 0.5, AbsoluteLayout.AutoSize, AbsoluteLayout.AutoSize));

            /*

            double[] x_dora_pos = { 0.16, 0.33, 0.5, 0.67, 0.84 };
            double[] y_dora_pos = { 0.07, 0.93 };

            double hight_dora = 0.45;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora01);
            AbsoluteLayout.SetLayoutFlags(image_dora01, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora01, new Rectangle(x_dora_pos[0], y_dora_pos[0], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.EndAndExpand;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora02);
            AbsoluteLayout.SetLayoutFlags(image_dora02, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora02, new Rectangle(x_dora_pos[0], y_dora_pos[1], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.EndAndExpand;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora03);
            AbsoluteLayout.SetLayoutFlags(image_dora03, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora03, new Rectangle(x_dora_pos[1], y_dora_pos[0], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.Center;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora04);
            AbsoluteLayout.SetLayoutFlags(image_dora04, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora04, new Rectangle(x_dora_pos[1], y_dora_pos[1], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.Center;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora05);
            AbsoluteLayout.SetLayoutFlags(image_dora05, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora05, new Rectangle(x_dora_pos[2], y_dora_pos[0], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.Center;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora06);
            AbsoluteLayout.SetLayoutFlags(image_dora06, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora06, new Rectangle(x_dora_pos[2], y_dora_pos[1], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.Center;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora07);
            AbsoluteLayout.SetLayoutFlags(image_dora07, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora07, new Rectangle(x_dora_pos[3], y_dora_pos[0], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.Center;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora08);
            AbsoluteLayout.SetLayoutFlags(image_dora08, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora08, new Rectangle(x_dora_pos[3], y_dora_pos[1], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.Center;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora09);
            AbsoluteLayout.SetLayoutFlags(image_dora09, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora09, new Rectangle(x_dora_pos[4], y_dora_pos[0], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.StartAndExpand;

            bottomBottomLeftTopLeftBottomAl.Children.Add(image_dora10);
            AbsoluteLayout.SetLayoutFlags(image_dora10, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_dora10, new Rectangle(x_dora_pos[4], y_dora_pos[1], AbsoluteLayout.AutoSize, hight_dora));
            image_dora01.HorizontalOptions = LayoutOptions.StartAndExpand;

            */
            #endregion

            #region どら表示実験

            bottomBottomLeftTopLeftBottomAl.Children.Add(doraHyojiSl01);
            AbsoluteLayout.SetLayoutFlags(doraHyojiSl01, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(doraHyojiSl01, new Rectangle(0.5, 0, 1, 0.5));

            bottomBottomLeftTopLeftBottomAl.Children.Add(doraHyojiSl02);
            AbsoluteLayout.SetLayoutFlags(doraHyojiSl02, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(doraHyojiSl02, new Rectangle(0.5, 1, 1, 0.5));

            doraHyojiSl01.Spacing = 0;
            doraHyojiSl02.Spacing = 0;

            Image[] image_dora = 
                {
                    image_dora01,
                    image_dora02,
                    image_dora03,
                    image_dora04,
                    image_dora05,
                    image_dora06,
                    image_dora07,
                    image_dora08,
                    image_dora09,
                    image_dora10,
                };

            for (int i = 0; i < image_dora.Length; i++)
            {
                if(i % 2 == 0)
                {
                    doraHyojiSl01.Children.Add(image_dora[i]);
                    image_dora[i].VerticalOptions = LayoutOptions.EndAndExpand;
                }
                else
                {
                    doraHyojiSl02.Children.Add(image_dora[i]);
                    image_dora[i].VerticalOptions = LayoutOptions.StartAndExpand;
                }
                
                if(i < 2)
                {
                    image_dora[i].HorizontalOptions = LayoutOptions.EndAndExpand;
                }
                else if(i > 7)
                {
                    image_dora[i].HorizontalOptions = LayoutOptions.StartAndExpand;
                }
                else
                {
                    image_dora[i].HorizontalOptions = LayoutOptions.Center;
                }

                image_dora[i].MinimumWidthRequest = 5;
                image_dora[i].MinimumHeightRequest = 7;
                
            }

            #endregion

            #region 場風・自風の牌・ラベル

            bottomBottomLeftTopRightTopAl.Children.Add(label_bakaze_jikaze);
            AbsoluteLayout.SetLayoutFlags(label_bakaze_jikaze, AbsoluteLayoutFlags.PositionProportional);
            AbsoluteLayout.SetLayoutBounds(label_bakaze_jikaze, new Rectangle(0.5, 0.5, AbsoluteLayout.AutoSize, AbsoluteLayout.AutoSize));

            bottomBottomLeftTopRightBottomAl.Children.Add(image_bakaze);
            AbsoluteLayout.SetLayoutFlags(image_bakaze, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_bakaze, new Rectangle(0.07, 0.07, AbsoluteLayout.AutoSize, 0.45));
            image_bakaze.MinimumHeightRequest = 7;
            image_bakaze.MinimumWidthRequest = 5;

            bottomBottomLeftTopRightBottomAl.Children.Add(image_jikaze);
            AbsoluteLayout.SetLayoutFlags(image_jikaze, AbsoluteLayoutFlags.PositionProportional | AbsoluteLayoutFlags.HeightProportional);
            AbsoluteLayout.SetLayoutBounds(image_jikaze, new Rectangle(0.07, 0.93, AbsoluteLayout.AutoSize, 0.45));
            image_jikaze.MinimumHeightRequest = 7;
            image_jikaze.MinimumWidthRequest = 5;


            bottomBottomLeftTopRightBottomAl.Children.Add(label_bakaze);
            AbsoluteLayout.SetLayoutFlags(label_bakaze, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(label_bakaze, new Rectangle(1, 0, 0.5, 0.5));

            bottomBottomLeftTopRightBottomAl.Children.Add(label_jikaze);
            AbsoluteLayout.SetLayoutFlags(label_jikaze, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(label_jikaze, new Rectangle(1, 1, 0.5, 0.5));


            #endregion

            #region 左下のボタン2つ

            bottomBottomLeftBottomAl.Children.Add(button_mokkai);
            AbsoluteLayout.SetLayoutFlags(button_mokkai, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_mokkai, new Rectangle(0.1, 0.5, 0.4, 0.9));

            bottomBottomLeftBottomAl.Children.Add(button_keisan);
            AbsoluteLayout.SetLayoutFlags(button_keisan, AbsoluteLayoutFlags.All);
            AbsoluteLayout.SetLayoutBounds(button_keisan, new Rectangle(0.9, 0.5, 0.4, 0.9));

            #endregion

            #endregion

            //タップイベント追加
            var tgr = new TapGestureRecognizer();
            tgr.Tapped += (sender, e) => OnLabelClicked(sender, e);
            image_dora01.GestureRecognizers.Add(tgr);

            this.Content = outestAl;

            
        }

        private void OnLabelClicked(object sender, EventArgs e)
        {

        }

        private void ButtonCalcTap(object sender, EventArgs e)
        {
            Navigation.PushAsync(new AfterCalcPage());
        }

        private void ButtonReturnToCameraTap(object sender, EventArgs e)
        {
            Navigation.PopToRootAsync();
        } 
    }
}