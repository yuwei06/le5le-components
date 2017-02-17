export class FileItem {
  public file:File;
  public url:string;
  public isReady:boolean = false;
  public isUploading:boolean = false;
  public isCancel:boolean = false;
  public error:string = '';
  public progress:number = 0;

  constructor(private some:any) {
    this.file = some;
  }
}
