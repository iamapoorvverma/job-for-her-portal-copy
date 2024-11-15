#include<bits/stdc++.h>
using namespace std;
int main(){
    // vector<int> v;
    // int num;
    // while(cin>>num){
    //     v.push_back(num);
    // }
    vector<int>v;
    string str;
    getline(cin,str);
    string s;
    for(int i=0;i<str.size();i++){
        // if(i==s.size()-1){
        //     v.push_back(stoi(s));
        // }
        if(str[i]==','){
            v.push_back(stoi(s));
            s="";
        }
        else{
            s=s+str[i];
        }
    }
     // Add the last number after the loop ends
    if (!s.empty()) {
        v.push_back(stoi(s));
    }

    for( auto i :v){
        cout<<i<<endl;
    }
     
    return 0;
}